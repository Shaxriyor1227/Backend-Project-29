module.exports = (sequelize, DataTypes) => {
    const Gender = sequelize.define(
        "Gender",
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
            tableName: "gender",
            timestamps: true,
        }
    );

    Gender.associate = (models) => {
        Gender.hasMany(models.Customer, {
            foreignKey: "gender_id",
            as: "customers"
        });

        Gender.hasMany(models.HumanCategory, {
            foreignKey: "gender_id",
            as: "humanCategories"
        });
    };

    return Gender;
};
