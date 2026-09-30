module.exports = (sequelize, DataTypes) => {
    const PaymentMethod = sequelize.define(
        "PaymentMethod",
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
        },
        {
            tableName: "payment_method",
            timestamps: true,
        }
    );

    PaymentMethod.associate = (models) => {
        PaymentMethod.hasMany(models.Booking, {
            foreignKey: "payment_method_id",
            as: "bookings"
        });
    }

    return PaymentMethod;
};
