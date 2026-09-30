const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize } = require("./models");

// Routes import
const adminRoutes = require("./routes/admin.routes");
const bookingRoutes = require("./routes/booking.routes");
const cartRoutes = require("./routes/cart.routes");
const cartItemRoutes = require("./routes/cart_item.routes");
const countryRoutes = require("./routes/country.routes");
const customerRoutes = require("./routes/customer.routes");
const customerAddressRoutes = require("./routes/customer_address.routes");
const customerCardRoutes = require("./routes/customer_card.routes");
const deliveryMethodRoutes = require("./routes/delivery_method.routes");
const discountRoutes = require("./routes/discount.routes");
const districtRoutes = require("./routes/district.routes");
const eventRoutes = require("./routes/event.routes");
const eventTypeRoutes = require("./routes/event_type.routes");
const flatRoutes = require("./routes/flat.routes");
const genderRoutes = require("./routes/gender.routes");
const humanCategoryRoutes = require("./routes/human_category.routes");
const langRoutes = require("./routes/lang.routes");
const paymentMethodRoutes = require("./routes/payment_method.routes");
const regionRoutes = require("./routes/region.routes");
const seatRoutes = require("./routes/seat.routes");
const seatTypeRoutes = require("./routes/seat_type.routes");
const sectorRoutes = require("./routes/sector.routes");
const ticketRoutes = require("./routes/ticket.routes");
const ticketStatusRoutes = require("./routes/ticket_status.routes");
const ticketTypeRoutes = require("./routes/ticket_type.routes");
const typesRoutes = require("./routes/types.routes");
const venueRoutes = require("./routes/venue.routes");
const venuePhotoRoutes = require("./routes/venue_photo.routes");
const venueTypesRoutes = require("./routes/venue_types.routes");

const { setupSwagger } = require("./swagger/swagger");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*",
}));

// Routes
app.use("/api", adminRoutes);
app.use("/api", bookingRoutes);
app.use("/api", cartRoutes);
app.use("/api", cartItemRoutes);
app.use("/api", countryRoutes);
app.use("/api", customerRoutes);
app.use("/api", customerAddressRoutes);
app.use("/api", customerCardRoutes);
app.use("/api", deliveryMethodRoutes);
app.use("/api", discountRoutes);
app.use("/api", districtRoutes);
app.use("/api", eventRoutes);
app.use("/api", eventTypeRoutes);
app.use("/api", flatRoutes);
app.use("/api", genderRoutes);
app.use("/api", humanCategoryRoutes);
app.use("/api", langRoutes);
app.use("/api", paymentMethodRoutes);
app.use("/api", regionRoutes);
app.use("/api", seatRoutes);
app.use("/api", seatTypeRoutes);
app.use("/api", sectorRoutes);
app.use("/api", ticketRoutes);
app.use("/api", ticketStatusRoutes);
app.use("/api", ticketTypeRoutes);
app.use("/api", typesRoutes);
app.use("/api", venueRoutes);
app.use("/api", venuePhotoRoutes);
app.use("/api", venueTypesRoutes);

setupSwagger(app);

const PORT = process.env.PORT || 3333;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
    });
});
