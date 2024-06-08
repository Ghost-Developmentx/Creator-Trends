"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000; // You can choose any port you prefer
app.get('/', (req, res) => {
    res.send('Creator Trends Backend is running!');
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
