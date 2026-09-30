module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define(
        "Cart",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            customer_id: {
                type: DataTypes.BIGINT
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            fineshedAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            status_id: {
                type: DataTypes.SMALLINT
            },
        },
        {
            tableName: "cart",
            timestamps: true,
        }
    );

    Cart.associate = (models) => {
        Cart.belongsTo(models.Customer, {
            foreignKey: "customer_id",
            as: "customer"
        });

        Cart.hasMany(models.CartItem, {
            foreignKey: "cart_id",
            as: "carts_item"
        });

        Cart.hasMany(models.Booking, {
            foreignKey: "cart_id",
            as: "bookings"
        });
    };

    return Cart;
};
