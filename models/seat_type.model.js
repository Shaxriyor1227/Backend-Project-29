module.exports = (sequelize, DataTypes) => {
    const SeatType = sequelize.define(
        "SeatType",
        {
            id: {
                type: DataTypes.SMALLINT,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            tableName: "seat_type",
            timestamps: true,
        }
    );

    SeatType.associate = (models) => {
        SeatType.hasMany(models.Seat, {
            foreignKey: "seat_type_id",
            as: "seats"
        });
    };

    return SeatType;
};
