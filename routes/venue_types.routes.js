const express = require("express");
const router = express.Router();
const controller = require("../controller/venue_types.controller");

/**
 * @swagger
 * tags:
 *   name: VenueTypes
 *   description: Venue types management
 */

/**
 * @swagger
 * /api/venue-types:
 *   post:
 *     tags: [VenueTypes]
 *     summary: Create a new venue type link
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venueId:
 *                 type: integer
 *               typeId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Venue Type Link created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/venue-types", controller.createVenueTypes);

/**
 * @swagger
 * /api/venue-types:
 *   get:
 *     tags: [VenueTypes]
 *     summary: Get all venue types links
 *     responses:
 *       200:
 *         description: List of venue types links
 *       500:
 *         description: Server error
 */
router.get("/venue-types", controller.getAllVenueTypes);

/**
 * @swagger
 * /api/venue-types/search:
 *   get:
 *     tags: [VenueTypes]
 *     summary: Search venue types links
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of venue types links matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/venue-types/search", controller.searchVenueTypes);

/**
 * @swagger
 * /api/venue-types/{id}:
 *   get:
 *     tags: [VenueTypes]
 *     summary: Get venue type link by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Venue Type Link ID
 *     responses:
 *       200:
 *         description: Venue Type Link details
 *       404:
 *         description: Venue Type Link not found
 *       500:
 *         description: Server error
 */
router.get("/venue-types/:id", controller.getVenueTypesById);

/**
 * @swagger
 * /api/venue-types/{id}:
 *   put:
 *     tags: [VenueTypes]
 *     summary: Update venue type link by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Venue Type Link ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venueId:
 *                 type: integer
 *               typeId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Venue Type Link updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Venue Type Link not found
 *       500:
 *         description: Server error
 */
router.put("/venue-types/:id", controller.updateVenueTypes);

/**
 * @swagger
 * /api/venue-types/{id}:
 *   delete:
 *     tags: [VenueTypes]
 *     summary: Delete venue type link by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Venue Type Link ID
 *     responses:
 *       200:
 *         description: Venue Type Link deleted
 *       404:
 *         description: Venue Type Link not found
 *       500:
 *         description: Server error
 */
router.delete("/venue-types/:id", controller.deleteVenueTypes);

module.exports = router;
