const express = require("express");
const router = express.Router();
const controller = require("../controller/region.controller");

/**
 * @swagger
 * tags:
 *   name: Regions
 *   description: Region management
 */

/**
 * @swagger
 * /api/region:
 *   post:
 *     tags: [Regions]
 *     summary: Create a new region
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
 *         description: Region created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/region", controller.createRegion);

/**
 * @swagger
 * /api/region:
 *   get:
 *     tags: [Regions]
 *     summary: Get all regions
 *     responses:
 *       200:
 *         description: List of regions
 *       500:
 *         description: Server error
 */
router.get("/region", controller.getAllRegions);

/**
 * @swagger
 * /api/region/search:
 *   get:
 *     tags: [Regions]
 *     summary: Search regions
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of regions matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/region/search", controller.searchRegions);

/**
 * @swagger
 * /api/region/{id}:
 *   get:
 *     tags: [Regions]
 *     summary: Get region by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Region ID
 *     responses:
 *       200:
 *         description: Region details
 *       404:
 *         description: Region not found
 *       500:
 *         description: Server error
 */
router.get("/region/:id", controller.getRegionById);

/**
 * @swagger
 * /api/region/{id}:
 *   put:
 *     tags: [Regions]
 *     summary: Update region by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Region ID
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
 *         description: Region updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Region not found
 *       500:
 *         description: Server error
 */
router.put("/region/:id", controller.updateRegion);

/**
 * @swagger
 * /api/region/{id}:
 *   delete:
 *     tags: [Regions]
 *     summary: Delete region by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Region ID
 *     responses:
 *       200:
 *         description: Region deleted
 *       404:
 *         description: Region not found
 *       500:
 *         description: Server error
 */
router.delete("/region/:id", controller.deleteRegion);

module.exports = router;
