module.exports = (sequelize, DataTypes) => {
    const EventType = sequelize.define(
        "EventType",
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
            parent_event_type_id: {
                type: DataTypes.SMALLINT,
                allowNull: true,
            },
        },
        {
            tableName: "event_type",
            timestamps: true,
        }
    );

    EventType.associate = (models) => {
        EventType.hasMany(models.Event, {
            foreignKey: "event_type_id",
            as: "events"
        });

        EventType.hasMany(models.EventType, {
            foreignKey: "parent_event_type_id",
            as: "subEventTypes"
        });

        EventType.belongsTo(models.EventType, {
            foreignKey: "parent_event_type_id",
            as: "parentEventType"
        });
    };

    return EventType;
};
