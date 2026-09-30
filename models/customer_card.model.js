module.exports = (sequelize, DataTypes) => {
    const CustomerCard = sequelize.define(
        "CustomerCard",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            customer_id: {
                type: DataTypes.BIGINT
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            number: {
                type: DataTypes.STRING,
                allowNull: false
            },
            year: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            month: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            is_main: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
        },
        {
            tableName: "customer_card",
            timestamps: true,
        }
    );

    CustomerCard.associate = (models) => {
        CustomerCard.belongsTo(models.Customer, {
            foreignKey: "customer_id",
            as: "customer"
        });
    };

    return CustomerCard;
};
