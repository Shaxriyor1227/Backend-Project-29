const express = require("express");
const router = express.Router();
const controller = require("../controller/event_type.controller");

/**
 * @swagger
 * tags:
 *   name: EventTypes
 *   description: Event type management
 */

/**
 * @swagger
 * /api/event-type:
 *   post:
 *     tags: [EventTypes]
 *     summary: Create a new event type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               parent_event_type_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Event Type created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/event-type", controller.createEventType);

/**
 * @swagger
 * /api/event-type:
 *   get:
 *     tags: [EventTypes]
 *     summary: Get all event types
 *     responses:
 *       200:
 *         description: List of event types
 *       500:
 *         description: Server error
 */
router.get("/event-type", controller.getAllEventTypes);

/**
 * @swagger
 * /api/event-type/search:
 *   get:
 *     tags: [EventTypes]
 *     summary: Search event types
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of event types matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/event-type/search", controller.searchEventTypes);

/**
 * @swagger
 * /api/event-type/{id}:
 *   get:
 *     tags: [EventTypes]
 *     summary: Get event type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Event Type ID
 *     responses:
 *       200:
 *         description: Event Type details
 *       404:
 *         description: Event Type not found
 *       500:
 *         description: Server error
 */
router.get("/event-type/:id", controller.getEventTypeById);

/**
 * @swagger
 * /api/event-type/{id}:
 *   put:
 *     tags: [EventTypes]
 *     summary: Update event type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Event Type ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               parent_event_type_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Event Type updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Event Type not found
 *       500:
 *         description: Server error
 */
router.put("/event-type/:id", controller.updateEventType);

/**
 * @swagger
 * /api/event-type/{id}:
 *   delete:
 *     tags: [EventTypes]
 *     summary: Delete event type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Event Type ID
 *     responses:
 *       200:
 *         description: Event Type deleted
 *       404:
 *         description: Event Type not found
 *       500:
 *         description: Server error
 */
router.delete("/event-type/:id", controller.deleteEventType);

module.exports = router;
