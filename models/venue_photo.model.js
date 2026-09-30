module.exports = (sequelize, DataTypes) => {
    const VenuePhoto = sequelize.define(
        "VenuePhoto",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },
            venueId: {
                type: DataTypes.BIGINT,
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "venue_photo",
            timestamps: true,
        }
    );

    VenuePhoto.associate = (models) => {
        VenuePhoto.belongsTo(models.Venue, {
            foreignKey: "venueId",
            as: "venue"
        });
    };

    return VenuePhoto;
};
