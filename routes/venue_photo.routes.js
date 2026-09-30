const express = require("express");
const router = express.Router();
const controller = require("../controller/venue_photo.controller");

/**
 * @swagger
 * tags:
 *   name: VenuePhotos
 *   description: Venue photo management
 */

/**
 * @swagger
 * /api/venue-photo:
 *   post:
 *     tags: [VenuePhotos]
 *     summary: Create a new venue photo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venueId:
 *                 type: integer
 *               url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Venue Photo created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/venue-photo", controller.createVenuePhoto);

/**
 * @swagger
 * /api/venue-photo:
 *   get:
 *     tags: [VenuePhotos]
 *     summary: Get all venue photos
 *     responses:
 *       200:
 *         description: List of venue photos
 *       500:
 *         description: Server error
 */
router.get("/venue-photo", controller.getAllVenuePhotos);

/**
 * @swagger
 * /api/venue-photo/search:
 *   get:
 *     tags: [VenuePhotos]
 *     summary: Search venue photos
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of venue photos matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/venue-photo/search", controller.searchVenuePhotos);

/**
 * @swagger
 * /api/venue-photo/{id}:
 *   get:
 *     tags: [VenuePhotos]
 *     summary: Get venue photo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Venue Photo ID
 *     responses:
 *       200:
 *         description: Venue Photo details
 *       404:
 *         description: Venue Photo not found
 *       500:
 *         description: Server error
 */
router.get("/venue-photo/:id", controller.getVenuePhotoById);

/**
 * @swagger
 * /api/venue-photo/{id}:
 *   put:
 *     tags: [VenuePhotos]
 *     summary: Update venue photo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Venue Photo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venueId:
 *                 type: integer
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Venue Photo updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Venue Photo not found
 *       500:
 *         description: Server error
 */
router.put("/venue-photo/:id", controller.updateVenuePhoto);

/**
 * @swagger
 * /api/venue-photo/{id}:
 *   delete:
 *     tags: [VenuePhotos]
 *     summary: Delete venue photo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Venue Photo ID
 *     responses:
 *       200:
 *         description: Venue Photo deleted
 *       404:
 *         description: Venue Photo not found
 *       500:
 *         description: Server error
 */
router.delete("/venue-photo/:id", controller.deleteVenuePhoto);

module.exports = router;
