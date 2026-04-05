import express from "express";
import userRoutes from "./src/interfaces/routes/userRoutes";
import profileRoutes from "./src/interfaces/routes/ProfileRoutes";
import passwordHistoryRoutes from "./src/interfaces/routes/PasswordHistoryRoutes";
import roleRoutes from "./src/interfaces/routes/RoleRoutes";
import userRoleRoutes from "./src/interfaces/routes/UserRoleRoutes";
import cors from "cors";


export const app = express();

app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}));

app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", profileRoutes);
app.use("/api", passwordHistoryRoutes);
app.use("/api", roleRoutes);
app.use("/api", userRoleRoutes);

app.get("/health", (req, res) => {
    res.send("ok");
});