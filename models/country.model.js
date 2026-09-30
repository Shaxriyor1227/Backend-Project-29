module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define(
        "Country",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            country_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            tableName: "country",
            timestamps: true,
        }
    );

    return Country;
};
