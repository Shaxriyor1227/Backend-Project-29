module.exports = (sequelize, DataTypes) => {
    const Discount = sequelize.define(
        "Discount",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            discount: {
                type: DataTypes.STRING,
                allowNull: false
            },
            finish_date: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
        },
        {
            tableName: "discount",
            timestamps: true,
        }
    );

    Discount.associate = (models) => {
    Discount.hasMany(models.Booking, {
        foreignKey: "discount_id",
        as: "bookings"
    });
};


    return Discount;
};
