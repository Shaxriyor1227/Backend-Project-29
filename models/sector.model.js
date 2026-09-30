module.exports = (sequelize, DataTypes) => {
    const Sector = sequelize.define(
        "Sector",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            sector_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            tableName: "sector",
            timestamps: true,
        }
    );

    Sector.associate = (models) => {
        Sector.hasMany(models.Seat, {
            foreignKey: "sector_id",
            as: "seats"
        });
    };

    return Sector;
};
