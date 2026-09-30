const express = require("express");
const router = express.Router();
const controller = require("../controller/ticket_type.controller");

/**
 * @swagger
 * tags:
 *   name: TicketTypes
 *   description: Ticket type management
 */

/**
 * @swagger
 * /api/ticket-type:
 *   post:
 *     tags: [TicketTypes]
 *     summary: Create a new ticket type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ticket Type created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/ticket-type", controller.createTicketType);

/**
 * @swagger
 * /api/ticket-type:
 *   get:
 *     tags: [TicketTypes]
 *     summary: Get all ticket types
 *     responses:
 *       200:
 *         description: List of ticket types
 *       500:
 *         description: Server error
 */
router.get("/ticket-type", controller.getAllTicketTypes);

/**
 * @swagger
 * /api/ticket-type/search:
 *   get:
 *     tags: [TicketTypes]
 *     summary: Search ticket types
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of ticket types matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/ticket-type/search", controller.searchTicketTypes);

/**
 * @swagger
 * /api/ticket-type/{id}:
 *   get:
 *     tags: [TicketTypes]
 *     summary: Get ticket type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Ticket Type ID
 *     responses:
 *       200:
 *         description: Ticket Type details
 *       404:
 *         description: Ticket Type not found
 *       500:
 *         description: Server error
 */
router.get("/ticket-type/:id", controller.getTicketTypeById);

/**
 * @swagger
 * /api/ticket-type/{id}:
 *   put:
 *     tags: [TicketTypes]
 *     summary: Update ticket type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Ticket Type ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ticket Type updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Ticket Type not found
 *       500:
 *         description: Server error
 */
router.put("/ticket-type/:id", controller.updateTicketType);

/**
 * @swagger
 * /api/ticket-type/{id}:
 *   delete:
 *     tags: [TicketTypes]
 *     summary: Delete ticket type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Ticket Type ID
 *     responses:
 *       200:
 *         description: Ticket Type deleted
 *       404:
 *         description: Ticket Type not found
 *       500:
 *         description: Server error
 */
router.delete("/ticket-type/:id", controller.deleteTicketType);

module.exports = router;
