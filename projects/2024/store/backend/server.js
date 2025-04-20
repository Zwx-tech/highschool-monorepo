// src/index.ts
import express from "express";
import { connect } from "./db/connect";
import dotenv from "dotenv";
import cors from "cors";
import data from "./data/promotions.json";
import { registerUser } from "./db/methods";
const corsOptions = {
    origin: true,
    credentials: true,
};
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const db = await connect();
if (!db) {
    console.error("Failed to connect to the database");
}
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies
app.use(express.json()); // Middleware to parse JSON request bodies
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.get("/promotions", (req, res) => {
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
        res.status(201).json(result);
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
