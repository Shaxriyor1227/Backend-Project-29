const express = require("express");
const router = express.Router();
const controller = require("../controller/gender.controller");

/**
 * @swagger
 * tags:
 *   name: Genders
 *   description: Gender management
 */

/**
 * @swagger
 * /api/gender:
 *   post:
 *     tags: [Genders]
 *     summary: Create a new gender
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
 *         description: Gender created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/gender", controller.createGender);

/**
 * @swagger
 * /api/gender:
 *   get:
 *     tags: [Genders]
 *     summary: Get all genders
 *     responses:
 *       200:
 *         description: List of genders
 *       500:
 *         description: Server error
 */
router.get("/gender", controller.getAllGenders);

/**
 * @swagger
 * /api/gender/search:
 *   get:
 *     tags: [Genders]
 *     summary: Search genders
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of genders matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/gender/search", controller.searchGenders);

/**
 * @swagger
 * /api/gender/{id}:
 *   get:
 *     tags: [Genders]
 *     summary: Get gender by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Gender ID
 *     responses:
 *       200:
 *         description: Gender details
 *       404:
 *         description: Gender not found
 *       500:
 *         description: Server error
 */
router.get("/gender/:id", controller.getGenderById);

/**
 * @swagger
 * /api/gender/{id}:
 *   put:
 *     tags: [Genders]
 *     summary: Update gender by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Gender ID
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
 *         description: Gender updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Gender not found
 *       500:
 *         description: Server error
 */
router.put("/gender/:id", controller.updateGender);

/**
 * @swagger
 * /api/gender/{id}:
 *   delete:
 *     tags: [Genders]
 *     summary: Delete gender by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Gender ID
 *     responses:
 *       200:
 *         description: Gender deleted
 *       404:
 *         description: Gender not found
 *       500:
 *         description: Server error
 */
router.delete("/gender/:id", controller.deleteGender);

module.exports = router;
