module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define(
        "CartItem",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            ticket_id: {
                type: DataTypes.BIGINT
            },
            cart_id: {
                type: DataTypes.BIGINT
            },
        },
        {
            tableName: "cart_item",
            timestamps: true,
        }
    );

    CartItem.associate = (models) => {
        CartItem.belongsTo(models.Cart, {
            foreignKey: "cart_id",
            as: "cart"
        });

        CartItem.belongsTo(models.Ticket, {
            foreignKey: "ticket_id",
            as: "ticket"
        });
    };

    return CartItem;
};
