module.exports = (sequelize, DataTypes) => {
    const Venue = sequelize.define(
        "Venue",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
            },
            location: {
                type: DataTypes.STRING,
            },
            site: {
                type: DataTypes.STRING,
            },
            phone: {
                type: DataTypes.STRING,
            },
            schema: {
                // PostGIS bo'lsa DataTypes.GEOMETRY, oddiy matn/json yoki koordinata bo'lsa TEXT
                type: DataTypes.TEXT,
            },
            region_id: {
                type: DataTypes.INTEGER,
            },
            district_id: {
                type: DataTypes.INTEGER,
            },
        },
        {
            tableName: "venue",
            timestamps: true,
        }
    );

    Venue.associate = (models) => {
      Venue.hasMany(models.Event, {
        foreignKey: "venue_id",
        as: "events"
      });

      Venue.hasMany(models.Seat, {
        foreignKey: "venue_id",
        as: "seats"
      });

      Venue.belongsTo(models.Region, {
        foreignKey: "region_id",
        as: "region"
      });

      Venue.belongsTo(models.District, {
        foreignKey: "district_id",
        as: "district"
      });

      Venue.hasMany(models.VenuePhoto, {
        foreignKey: "venueId",
        as: "photos"
      });

      Venue.hasMany(models.VenueTypes, {
        foreignKey: "venueId",
        as: "venueTypes"
      });
    };

    return Venue;
};
