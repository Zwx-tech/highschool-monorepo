// src/index.ts
import express from "express";
import { Request, Response, Express } from "express";
import { connect } from "./db/connect";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import data from "./data/promotions.json";
import { getUserByEmail, registerUser } from "./db/methods";
import jwt from "jsonwebtoken";

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const db = await connect();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const SALT_ROUNDS = 10;

// Helper function to generate JWT
function generateToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

if (!db) {
  console.error("Failed to connect to the database");
}

app.use(cookieParser()); // Middleware to parse cookies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors(corsOptions)); // Middleware to enable CORS

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/promotions", (req: Request, res: Response) => {
  res.json(data.promotions);
});

app.get("/promotion/:id", (req, res) => {
  const response = data.promotions.find((promotion) => promotion.id === req.params.id);
  if (!response) {
    res.status(404).send("Not found");
  }
  res.json(response);
});

app.get("/product/:id", (req, res) => {
  // get zwraca produkty wyszukane przez id
  const response = data.products.find((product) => product.id === req.params.id);
  if (!response) {
    res.status(404).send("Not found");
  }
  res.json(response);
});

// @ts-expect-error
app.post("/register", async (req, res) => {
  const { user } = req.body;

  if (!user || !user.email || !user.password) {
    return res.status(400).json({ message: "Invalid user data" });
  }

  try {
    const result = await registerUser(db, user);

    res.cookie("session", generateToken({ email: user.email }));

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

//@ts-expect-error
app.post("/login", async (req, res) => {
  const { user } = req.body;

  if (!user || !user.email || !user.password) {
    return res.status(400).json({ message: "Invalid user data" });
  }

  try {
    const result = getUserByEmail(db, user.email);
    if (!result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const userData = await result;
    if (!userData) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (userData.password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.cookie("session", generateToken({ email: user.email }));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

//@ts-expect-error
app.get("/getUser", async (req, res) => {
  const token = req.query.token as string | undefined;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  //* Love u ts
  if (typeof decoded !== "object" || !("email" in decoded)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = await getUserByEmail(db, decoded.email);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.status(200).json(user);
});

//@ts-expect-error
app.get("/products", (req, res) => {
  const { search, category, sortBy, sortOrder } = req.query;

  if (!search && !category && !sortBy && !sortOrder) {
    return res.json(data.products);
  }
  const filteredProducts = data.products.filter((product) => {
    const nameMatch = search ? product.name.toLowerCase().startsWith((search as string).toLowerCase()) : true;
    if (!category) return nameMatch;
    const categoryMatch = category ? product.category === category : true;
    return nameMatch && categoryMatch;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy && sortOrder) {
      const order = sortOrder === "asc" ? 1 : -1;
      return a.price > b.price ? order : -order;
    }
    return 0;
  });

  res.status(200).json(sortedProducts);
});

//* It's hardcoded for now
app.get("/categories", (req, res) => {
  res.json(["PHONE", "TABLET", "LAPTOP", "DESKTOP"]);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
