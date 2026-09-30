module.exports = (sequelize, DataTypes) => {
    const TicketType = sequelize.define(
        "TicketType",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            ticket_type: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            tableName: "tycket_type",
            timestamps: true,
        }
    );

    TicketType.associate = (models) => {
        TicketType.hasMany(models.Ticket, {
            foreignKey: "ticket_type_id",
            as: "tickets"
        });
    };

    return TicketType;
};
