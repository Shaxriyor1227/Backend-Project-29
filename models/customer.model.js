const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define(
        "Customer",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            hashed_password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            birth_date: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            gender_id: {
                type: DataTypes.INTEGER
            },
            lang_id: {
                type: DataTypes.INTEGER
            },
            hashed_refresh_token: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            tableName: "customer",
            timestamps: true,
        }
    );

    Customer.beforeSave(async (customer) => {
        if (customer.changed("hashed_password")) {
            customer.hashed_password = await bcrypt.hash(customer.hashed_password, 10);
        }
    });


    Customer.associate = (models) => {
        Customer.hasMany(models.CustomerCard, {
            foreignKey : "customer_id",
            as: "customerCard"
        });

        Customer.hasMany(models.CustomerAddress, {
            foreignKey: "customer_id",
            as: "customerAddress"
        });

        Customer.hasMany(models.Cart, {
            foreignKey: "customer_id",
            as: "carts"
        });

        Customer.belongsTo(models.Gender, {
            foreignKey: "gender_id",
            as: "gender"
        });

        Customer.belongsTo(models.Lang, {
            foreignKey: "lang_id",
            as: "language"
        });
    }


    return Customer;
};
