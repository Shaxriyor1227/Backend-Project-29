const express = require("express");
const router = express.Router();
const controller = require("../controller/seat_type.controller");

/**
 * @swagger
 * tags:
 *   name: SeatTypes
 *   description: Seat type management
 */

/**
 * @swagger
 * /api/seat-type:
 *   post:
 *     tags: [SeatTypes]
 *     summary: Create a new seat type
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
 *         description: Seat Type created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/seat-type", controller.createSeatType);

/**
 * @swagger
 * /api/seat-type:
 *   get:
 *     tags: [SeatTypes]
 *     summary: Get all seat types
 *     responses:
 *       200:
 *         description: List of seat types
 *       500:
 *         description: Server error
 */
router.get("/seat-type", controller.getAllSeatTypes);

/**
 * @swagger
 * /api/seat-type/search:
 *   get:
 *     tags: [SeatTypes]
 *     summary: Search seat types
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of seat types matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/seat-type/search", controller.searchSeatTypes);

/**
 * @swagger
 * /api/seat-type/{id}:
 *   get:
 *     tags: [SeatTypes]
 *     summary: Get seat type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Seat Type ID
 *     responses:
 *       200:
 *         description: Seat Type details
 *       404:
 *         description: Seat Type not found
 *       500:
 *         description: Server error
 */
router.get("/seat-type/:id", controller.getSeatTypeById);

/**
 * @swagger
 * /api/seat-type/{id}:
 *   put:
 *     tags: [SeatTypes]
 *     summary: Update seat type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Seat Type ID
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
 *         description: Seat Type updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Seat Type not found
 *       500:
 *         description: Server error
 */
router.put("/seat-type/:id", controller.updateSeatType);

/**
 * @swagger
 * /api/seat-type/{id}:
 *   delete:
 *     tags: [SeatTypes]
 *     summary: Delete seat type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Seat Type ID
 *     responses:
 *       200:
 *         description: Seat Type deleted
 *       404:
 *         description: Seat Type not found
 *       500:
 *         description: Server error
 */
router.delete("/seat-type/:id", controller.deleteSeatType);

module.exports = router;
