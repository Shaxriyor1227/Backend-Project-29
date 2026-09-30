const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define(
        "Admin",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            login: {
                type: DataTypes.STRING,
                allowNull: false
            },
            hashed_password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            is_creator: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            hashed_refresh_token: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            tableName: "admin",
            timestamps: true,
        }
    );

    Admin.beforeSave(async (admin) => {
        if (admin.changed("hashed_password")) {
            admin.hashed_password = await bcrypt.hash(admin.hashed_password, 10);
        }
    });


    return Admin;
};
