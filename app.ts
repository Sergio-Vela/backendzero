import express from "express";
import userRoutes from "./src/interfaces/routes/userRoutes";

export const app = express();

app.use(express.json());
app.use("/api", userRoutes)

app.get("/health", (req, res) => {
    res.send("ok");
});