import { User } from "./usermodel";
import { PasswordHistory } from "./passwordHistoryModel";
import { Role } from "./rolmodel";
import { UserProfile } from "./userProfileModel";
import { UserRole } from "./userRoleModel";
import { Header } from "./header";
import { Category } from "./inventory/categoryModel";
import { Material } from "./inventory/materialModel";
import { Supplier } from "./inventory/supplierModel";
import { Purchase } from "./inventory/purchaseModel";
import { PurchaseDetail } from "./inventory/purchaseDetailModel";
import { Movement } from "./inventory/movementModel";

export const registerModels = () => {

    User.hasOne(UserProfile, { foreignKey: 'userId', as: 'profile' });
    UserProfile.belongsTo(User, { foreignKey: 'userId', as: 'user' })

    User.hasMany(PasswordHistory, { foreignKey: 'userId', as: 'pwh' });
    PasswordHistory.belongsTo(User, { foreignKey: 'userId', as: 'user' });

    User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId', as: 'roles' })
    Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId', as: 'users' })

    Category.hasMany(Material, { foreignKey: "categoriaId" });
    Material.belongsTo(Category, { foreignKey: "categoriaId" });

    Supplier.hasMany(Purchase, { foreignKey: "supplierId" });
    Purchase.belongsTo(Supplier, { foreignKey: "supplierId" });

    Purchase.hasMany(PurchaseDetail, { foreignKey: "purchaseId", as: 'detalles' });
    PurchaseDetail.belongsTo(Purchase, { foreignKey: "purchaseId" });

    Material.hasMany(PurchaseDetail, { foreignKey: "materialId" });
    PurchaseDetail.belongsTo(Material, { foreignKey: "materialId" });

    Material.hasMany(Movement, { foreignKey: "materialId" });
    Movement.belongsTo(Material, { foreignKey: "materialId" });

    return { User, UserProfile, UserRole, Role, PasswordHistory, Header }

};


