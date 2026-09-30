module.exports = (sequelize, DataTypes) => {
    const Types = sequelize.define(
        "Types",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "types",
            timestamps: true,
        }
    );

    Types.associate = (models) => {
        Types.hasMany(models.VenueTypes, {
            foreignKey: "typeId",
            as: "venueTypes"
        });
    };

    return Types;
};
