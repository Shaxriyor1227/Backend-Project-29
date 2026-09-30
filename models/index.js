const Sequelize = require("sequelize");
const sequelize = require("../config/database");

// Modellar importi va initsializatsiyasi
const Admin = require("./admin.model")(sequelize, Sequelize);
const Booking = require("./booking.model")(sequelize, Sequelize);
const Cart = require("./cart.model")(sequelize, Sequelize);
const CartItem = require("./cart_item.model")(sequelize, Sequelize);
const Country = require("./country.model")(sequelize, Sequelize);
const Customer = require("./customer.model")(sequelize, Sequelize);
const CustomerAddress = require("./customer_address.model")(sequelize, Sequelize);
const CustomerCard = require("./customer_card.model")(sequelize, Sequelize);
const DeliveryMethod = require("./delivery_method.model")(sequelize, Sequelize);
const Discount = require("./discount.model")(sequelize, Sequelize);
const District = require("./district.model")(sequelize, Sequelize);
const Event = require("./event.model")(sequelize, Sequelize);
const EventType = require("./event_type.model")(sequelize, Sequelize);
const Flat = require("./flat.model")(sequelize, Sequelize);
const Gender = require("./gender.model")(sequelize, Sequelize);
const HumanCategory = require("./human_category.model")(sequelize, Sequelize);
const Lang = require("./lang.model")(sequelize, Sequelize);
const PaymentMethod = require("./payment_method.model")(sequelize, Sequelize);
const Region = require("./region.model")(sequelize, Sequelize);
const Seat = require("./seat.model")(sequelize, Sequelize);
const SeatType = require("./seat_type.model")(sequelize, Sequelize);
const Sector = require("./sector.model")(sequelize, Sequelize);
const Ticket = require("./ticket.model")(sequelize, Sequelize);
const TicketStatus = require("./ticket_status.model")(sequelize, Sequelize);
const TicketType = require("./ticket_type.model")(sequelize, Sequelize);
const Types = require("./types.model")(sequelize, Sequelize);
const Venue = require("./venue.model")(sequelize, Sequelize);
const VenuePhoto = require("./venue_photo.model")(sequelize, Sequelize);
const VenueTypes = require("./venue_types.model")(sequelize, Sequelize);

// Model connections (bog'lanishlar - qaysi modelda associate metodi bo'lsa avtomatik ulaydi)
Object.values(sequelize.models).forEach((model) => {
    if (typeof model.associate === "function") {
        model.associate(sequelize.models);
    }
});

module.exports = {
    Admin,
    Booking,
    Cart,
    CartItem,
    Country,
    Customer,
    CustomerAddress,
    CustomerCard,
    DeliveryMethod,
    Discount,
    District,
    Event,
    EventType,
    Flat,
    Gender,
    HumanCategory,
    Lang,
    PaymentMethod,
    Region,
    Seat,
    SeatType,
    Sector,
    Ticket,
    TicketStatus,
    TicketType,
    Types,
    Venue,
    VenuePhoto,
    VenueTypes,
    sequelize,
};
