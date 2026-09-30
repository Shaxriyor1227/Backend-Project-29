const express = require("express");
const router = express.Router();
const controller = require("../controller/flat.controller");

/**
 * @swagger
 * tags:
 *   name: Flats
 *   description: Flat management
 */

/**
 * @swagger
 * /api/flat:
 *   post:
 *     tags: [Flats]
 *     summary: Create a new flat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               etaj:
 *                 type: integer
 *               condition:
 *                 type: string
 *     responses:
 *       201:
 *         description: Flat created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/flat", controller.createFlat);

/**
 * @swagger
 * /api/flat:
 *   get:
 *     tags: [Flats]
 *     summary: Get all flats
 *     responses:
 *       200:
 *         description: List of flats
 *       500:
 *         description: Server error
 */
router.get("/flat", controller.getAllFlats);

/**
 * @swagger
 * /api/flat/search:
 *   get:
 *     tags: [Flats]
 *     summary: Search flats
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of flats matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/flat/search", controller.searchFlats);

/**
 * @swagger
 * /api/flat/{id}:
 *   get:
 *     tags: [Flats]
 *     summary: Get flat by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Flat ID
 *     responses:
 *       200:
 *         description: Flat details
 *       404:
 *         description: Flat not found
 *       500:
 *         description: Server error
 */
router.get("/flat/:id", controller.getFlatById);

/**
 * @swagger
 * /api/flat/{id}:
 *   put:
 *     tags: [Flats]
 *     summary: Update flat by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Flat ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               etaj:
 *                 type: integer
 *               condition:
 *                 type: string
 *     responses:
 *       200:
 *         description: Flat updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Flat not found
 *       500:
 *         description: Server error
 */
router.put("/flat/:id", controller.updateFlat);

/**
 * @swagger
 * /api/flat/{id}:
 *   delete:
 *     tags: [Flats]
 *     summary: Delete flat by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Flat ID
 *     responses:
 *       200:
 *         description: Flat deleted
 *       404:
 *         description: Flat not found
 *       500:
 *         description: Server error
 */
router.delete("/flat/:id", controller.deleteFlat);

module.exports = router;
