module.exports = (sequelize, DataTypes) => {
    const Lang = sequelize.define(
        "Lang",
        {
            id: {
                type: DataTypes.SMALLINT,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "lang",
            timestamps: true,
        }
    );

    Lang.associate = (models) => {
        Lang.hasMany(models.Customer, {
            foreignKey: "lang_id",
            as: "customers"
        });

        Lang.hasMany(models.Event, {
            foreignKey: "lang_id",
            as: "events"
        });
    };

    return Lang;
};
