"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const promotions_json_1 = __importDefault(require("./data/promotions.json"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
/*
      "image": "https://www.brickfanatics.com/wp-content/uploads/2023/09/LEGO-Icons-Winter-Village-10325-Alpine-Lodge-featured-1-1024x576.png",
      "image": "httplos://www.lego.com/cdn/cs/set/assets/blt377341d120db9430/Hero_Banner_2024_-_Desktop.jpg?fit=crop&format=jpg&quality=80&width=1600&height=500&dpr=1",
*/
//* Fix cors issue
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.get("/promotions", (req, res) => {
    res.json(promotions_json_1.default.promotions);
});
app.get("/promotion/:id", (req, res) => {
    const response = promotions_json_1.default.promotions.find((promotion) => promotion.id === req.params.id);
    if (!response) {
        res.status(404).send("Not found");
    }
    res.json(response);
});
app.get("/product/:id", (req, res) => {
    // get zwraca produkty wyszukane przez id
    const response = promotions_json_1.default.products.find((product) => product.id === req.params.id);
    if (!response) {
        res.status(404).send("Not found");
    }
    res.json(response);
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
