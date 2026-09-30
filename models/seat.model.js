module.exports = (sequelize, DataTypes) => {
    const Seat = sequelize.define(
        "Seat",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            sector_id: {
                type: DataTypes.SMALLINT
            },
            row_number: {
                type: DataTypes.SMALLINT,
                allowNull: false
            },
            number: {
                type: DataTypes.SMALLINT,
                allowNull: false
            },
            venue_id: {
                type: DataTypes.BIGINT
            },
            seat_type_id: {
                type: DataTypes.SMALLINT
            },
            location_in_schema: {
                type: DataTypes.TEXT, // PostGIS bo'lsa DataTypes.GEOMETRY, oddiy matn uchun TEXT
                allowNull: false,
            },
        },
        {
            tableName: "seat",
            timestamps: true,
        }
    );

    Seat.associate = (models) => {
        Seat.belongsTo(models.Venue, {
            foreignKey: "venue_id",
            as: "venue"
        });

        Seat.hasMany(models.Ticket, {
            foreignKey: "seat_id",
            as: "tickets"
        });

        Seat.belongsTo(models.Sector, {
            foreignKey: "sector_id",
            as: "sector"
        });

        Seat.belongsTo(models.SeatType, {
            foreignKey: "seat_type_id",
            as: "seatType"
        });
    };

    return Seat;
};
