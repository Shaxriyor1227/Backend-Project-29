module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define(
        "Booking",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            cart_id: {
                type: DataTypes.BIGINT
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            fineshed: {
                type: DataTypes.DATE,
                allowNull: false
            },
            payment_method_id: {
                type: DataTypes.SMALLINT
            },
            delivery_method_id: {
                type: DataTypes.SMALLINT
            },
            discount_id: {
                type: DataTypes.BIGINT
            },
            status_id: {
                type: DataTypes.SMALLINT
            },
        },
        {
            tableName: "booking",
            timestamps: true,
        }
    );

    Booking.associate = (models) => {
        Booking.belongsTo(models.Cart, {
            foreignKey: "cart_id",
            as: "cart"
        });

        Booking.belongsTo(models.PaymentMethod, {
            foreignKey: "payment_method_id",
            as: "paymentMethod"
        });

        Booking.belongsTo(models.DeliveryMethod, {
            foreignKey: "delivery_method_id",
            as: "deliveryMethod"
        });

        Booking.belongsTo(models.Discount, {
            foreignKey: "discount_id",
            as: "discount"
        });
    }

    return Booking;
};
