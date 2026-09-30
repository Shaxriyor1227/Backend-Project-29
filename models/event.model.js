module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define(
        "Event",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                // Diagrammada "bigint" yozilgan, lekin tadbir nomi matn bo'lgani sababli odatda STRING ishlatiladi.
                // Agar qat'iy diagrammadagidek bigint kerak bo'lsa: DataTypes.BIGINT
                type: DataTypes.STRING,
                allowNull: false,
            },
            photo: {
                type: DataTypes.STRING,
            },
            start_date: {
                type: DataTypes.DATEONLY,
            },
            start_time: {
                type: DataTypes.TIME,
            },
            finish_date: {
                type: DataTypes.DATEONLY,
            },
            finish_time: {
                type: DataTypes.TIME,
            },
            info: {
                type: DataTypes.TEXT,
            },
            event_type_id: {
                type: DataTypes.BIGINT,
            },
            human_category_id: {
                type: DataTypes.BIGINT,
            },
            venue_id: {
                type: DataTypes.BIGINT,
            },
            lang_id: {
                type: DataTypes.SMALLINT,
            },
            release_date: {
                type: DataTypes.DATEONLY,
            },
        },
        {
            tableName: "event",
            timestamps: true,
        }
    );

    Event.associate = (models) => {
        Event.hasMany(models.Ticket, {
            foreignKey: "event_id",
            as: "tickets"
        });

        Event.belongsTo(models.Venue, {
            foreignKey: "venue_id",
            as: "venue"
        });

        Event.belongsTo(models.Lang, {
            foreignKey: "lang_id",
            as: "language"
        });

        Event.belongsTo(models.EventType, {
            foreignKey: "event_type_id",
            as: "eventType"
        });

        Event.belongsTo(models.HumanCategory, {
            foreignKey: "human_category_id",
            as: "humanCategory"
        });
    };


    return Event;
};
