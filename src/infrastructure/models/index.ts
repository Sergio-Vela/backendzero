import { User } from "./usermodel";
import { PasswordHistory } from "./passwordHistoryModel";
import { Role } from "./rolmodel";
import { UserProfile } from "./userProfileModel";
import { UserRole } from "./userRoleModel";

export const registerModels = () => {
    
    User.hasOne(UserProfile, { foreignKey: 'userId', as: 'profile'} );
    UserProfile.belongsTo(User, { foreignKey: 'userId', as: 'user'})
    
    User.hasMany(PasswordHistory, { foreignKey: 'userId', as: 'pwh' });
    PasswordHistory.belongsTo(User, { foreignKey: 'userId', as: 'user'});

    User.belongsToMany( Role, { through: UserRole, foreignKey: 'userId', as: 'roles' })
    Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId', as: 'users'} )

    return { User, UserProfile, UserRole, Role, PasswordHistory} 
    
};


