module.exports = (sequelize, DataTypes) => {
    const Ticket = sequelize.define(
        "Ticket",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            event_id: {
                type: DataTypes.BIGINT
            },
            seat_id: {
                type: DataTypes.BIGINT
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            service_fee: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            status_id: {
                type: DataTypes.SMALLINT
            },
            ticket_type_id: {
                type: DataTypes.SMALLINT
            },
        },
        {
            tableName: "ticket",
            timestamps: true,
        }
    );

    Ticket.associate = (models) => {
        Ticket.hasMany(models.CartItem, {
            foreignKey: "ticket_id",
            as: "cartItem"
        });

        Ticket.belongsTo(models.Event, {
            foreignKey: "event_id",
            as: "event"
        });

        Ticket.belongsTo(models.Seat, {
            foreignKey: "seat_id",
            as: "seat"
        });

        Ticket.belongsTo(models.TicketType, {
            foreignKey: "ticket_type_id",
            as: "ticketType"
        });

        Ticket.belongsTo(models.TicketStatus, {
            foreignKey: "status_id",
            as: "ticketStatus"
        });
    };

    return Ticket;
};
