const express = require("express");
const router = express.Router();
const controller = require("../controller/lang.controller");

/**
 * @swagger
 * tags:
 *   name: Langs
 *   description: Language management
 */

/**
 * @swagger
 * /api/lang:
 *   post:
 *     tags: [Langs]
 *     summary: Create a new language
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
 *         description: Language created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/lang", controller.createLang);

/**
 * @swagger
 * /api/lang:
 *   get:
 *     tags: [Langs]
 *     summary: Get all languages
 *     responses:
 *       200:
 *         description: List of languages
 *       500:
 *         description: Server error
 */
router.get("/lang", controller.getAllLangs);

/**
 * @swagger
 * /api/lang/search:
 *   get:
 *     tags: [Langs]
 *     summary: Search languages
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of languages matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/lang/search", controller.searchLangs);

/**
 * @swagger
 * /api/lang/{id}:
 *   get:
 *     tags: [Langs]
 *     summary: Get language by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Language ID
 *     responses:
 *       200:
 *         description: Language details
 *       404:
 *         description: Language not found
 *       500:
 *         description: Server error
 */
router.get("/lang/:id", controller.getLangById);

/**
 * @swagger
 * /api/lang/{id}:
 *   put:
 *     tags: [Langs]
 *     summary: Update language by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Language ID
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
 *         description: Language updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Language not found
 *       500:
 *         description: Server error
 */
router.put("/lang/:id", controller.updateLang);

/**
 * @swagger
 * /api/lang/{id}:
 *   delete:
 *     tags: [Langs]
 *     summary: Delete language by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Language ID
 *     responses:
 *       200:
 *         description: Language deleted
 *       404:
 *         description: Language not found
 *       500:
 *         description: Server error
 */
router.delete("/lang/:id", controller.deleteLang);

module.exports = router;
