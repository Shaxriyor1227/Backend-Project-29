const express = require("express");
const router = express.Router();
const controller = require("../controller/ticket_status.controller");

/**
 * @swagger
 * tags:
 *   name: TicketStatuses
 *   description: Ticket status management
 */

/**
 * @swagger
 * /api/ticket-status:
 *   post:
 *     tags: [TicketStatuses]
 *     summary: Create a new ticket status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ticket Status created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/ticket-status", controller.createTicketStatus);

/**
 * @swagger
 * /api/ticket-status:
 *   get:
 *     tags: [TicketStatuses]
 *     summary: Get all ticket statuses
 *     responses:
 *       200:
 *         description: List of ticket statuses
 *       500:
 *         description: Server error
 */
router.get("/ticket-status", controller.getAllTicketStatuses);

/**
 * @swagger
 * /api/ticket-status/search:
 *   get:
 *     tags: [TicketStatuses]
 *     summary: Search ticket statuses
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of ticket statuses matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/ticket-status/search", controller.searchTicketStatuses);

/**
 * @swagger
 * /api/ticket-status/{id}:
 *   get:
 *     tags: [TicketStatuses]
 *     summary: Get ticket status by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Ticket Status ID
 *     responses:
 *       200:
 *         description: Ticket Status details
 *       404:
 *         description: Ticket Status not found
 *       500:
 *         description: Server error
 */
router.get("/ticket-status/:id", controller.getTicketStatusById);

/**
 * @swagger
 * /api/ticket-status/{id}:
 *   put:
 *     tags: [TicketStatuses]
 *     summary: Update ticket status by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Ticket Status ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ticket Status updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Ticket Status not found
 *       500:
 *         description: Server error
 */
router.put("/ticket-status/:id", controller.updateTicketStatus);

/**
 * @swagger
 * /api/ticket-status/{id}:
 *   delete:
 *     tags: [TicketStatuses]
 *     summary: Delete ticket status by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Ticket Status ID
 *     responses:
 *       200:
 *         description: Ticket Status deleted
 *       404:
 *         description: Ticket Status not found
 *       500:
 *         description: Server error
 */
router.delete("/ticket-status/:id", controller.deleteTicketStatus);

module.exports = router;
