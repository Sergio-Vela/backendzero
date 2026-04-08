import express from "express";
import userRoutes from "./src/interfaces/routes/userRoutes";
import profileRoutes from "./src/interfaces/routes/ProfileRoutes";
import passwordHistoryRoutes from "./src/interfaces/routes/PasswordHistoryRoutes";
import roleRoutes from "./src/interfaces/routes/RoleRoutes";
import userRoleRoutes from "./src/interfaces/routes/UserRoleRoutes";
import headerRoutes from "./src/interfaces/routes/HeaderRoutes";
import categoryRoutes from "./src/interfaces/routes/inventory/CategoryRoutes";
import materialRoutes from "./src/interfaces/routes/inventory/MaterialRoutes";
import supplierRoutes from "./src/interfaces/routes/inventory/SupplierRoutes";
import purchaseRoutes from "./src/interfaces/routes/inventory/PurchaseRoutes";
import purchaseDetailRoutes from "./src/interfaces/routes/inventory/PurchaseDetailRoutes";
import movementRoutes from "./src/interfaces/routes/inventory/MovementRoutes";
import cors from "cors";
import registerR from "./src/interfaces/routes/registerRoutes";
import LoginRouter from "./src/interfaces/routes/LoginRoutes";



export const app = express();

app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use("/api", userRoutes);
app.use("/api", profileRoutes);
app.use("/api", passwordHistoryRoutes);
app.use("/api", roleRoutes);
app.use("/api", userRoleRoutes);
app.use("/api", headerRoutes);
app.use("/api", categoryRoutes);
app.use("/api", materialRoutes);
app.use("/api", supplierRoutes);
app.use("/api", purchaseRoutes);
app.use("/api", purchaseDetailRoutes);
app.use("/api", movementRoutes);
app.use("/api", registerR)
app.use("/api", LoginRouter);

app.get("/health", (req, res) => {
    res.send("ok");
});