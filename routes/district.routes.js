const express = require("express");
const router = express.Router();
const controller = require("../controller/district.controller");

/**
 * @swagger
 * tags:
 *   name: Districts
 *   description: District management
 */

/**
 * @swagger
 * /api/district:
 *   post:
 *     tags: [Districts]
 *     summary: Create a new district
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               region_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: District created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/district", controller.createDistrict);

/**
 * @swagger
 * /api/district:
 *   get:
 *     tags: [Districts]
 *     summary: Get all districts
 *     responses:
 *       200:
 *         description: List of districts
 *       500:
 *         description: Server error
 */
router.get("/district", controller.getAllDistricts);

/**
 * @swagger
 * /api/district/search:
 *   get:
 *     tags: [Districts]
 *     summary: Search districts
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of districts matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/district/search", controller.searchDistricts);

/**
 * @swagger
 * /api/district/{id}:
 *   get:
 *     tags: [Districts]
 *     summary: Get district by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: District ID
 *     responses:
 *       200:
 *         description: District details
 *       404:
 *         description: District not found
 *       500:
 *         description: Server error
 */
router.get("/district/:id", controller.getDistrictById);

/**
 * @swagger
 * /api/district/{id}:
 *   put:
 *     tags: [Districts]
 *     summary: Update district by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: District ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               region_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: District updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: District not found
 *       500:
 *         description: Server error
 */
router.put("/district/:id", controller.updateDistrict);

/**
 * @swagger
 * /api/district/{id}:
 *   delete:
 *     tags: [Districts]
 *     summary: Delete district by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: District ID
 *     responses:
 *       200:
 *         description: District deleted
 *       404:
 *         description: District not found
 *       500:
 *         description: Server error
 */
router.delete("/district/:id", controller.deleteDistrict);

module.exports = router;
