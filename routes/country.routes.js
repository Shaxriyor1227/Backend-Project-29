const express = require("express");
const router = express.Router();
const controller = require("../controller/country.controller");

/**
 * @swagger
 * tags:
 *   name: Countries
 *   description: Country management
 */

/**
 * @swagger
 * /api/country:
 *   post:
 *     tags: [Countries]
 *     summary: Create a new country
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               country_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Country created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/country", controller.createCountry);

/**
 * @swagger
 * /api/country:
 *   get:
 *     tags: [Countries]
 *     summary: Get all countries
 *     responses:
 *       200:
 *         description: List of countries
 *       500:
 *         description: Server error
 */
router.get("/country", controller.getAllCountries);

/**
 * @swagger
 * /api/country/search:
 *   get:
 *     tags: [Countries]
 *     summary: Search countries
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of countries matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/country/search", controller.searchCountries);

/**
 * @swagger
 * /api/country/{id}:
 *   get:
 *     tags: [Countries]
 *     summary: Get country by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Country ID
 *     responses:
 *       200:
 *         description: Country details
 *       404:
 *         description: Country not found
 *       500:
 *         description: Server error
 */
router.get("/country/:id", controller.getCountryById);

/**
 * @swagger
 * /api/country/{id}:
 *   put:
 *     tags: [Countries]
 *     summary: Update country by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Country ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               country_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Country updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Country not found
 *       500:
 *         description: Server error
 */
router.put("/country/:id", controller.updateCountry);

/**
 * @swagger
 * /api/country/{id}:
 *   delete:
 *     tags: [Countries]
 *     summary: Delete country by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Country ID
 *     responses:
 *       200:
 *         description: Country deleted
 *       404:
 *         description: Country not found
 *       500:
 *         description: Server error
 */
router.delete("/country/:id", controller.deleteCountry);

module.exports = router;
