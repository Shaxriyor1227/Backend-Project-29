const express = require("express");
const router = express.Router();
const controller = require("../controller/human_category.controller");

/**
 * @swagger
 * tags:
 *   name: HumanCategories
 *   description: Human category management
 */

/**
 * @swagger
 * /api/human-category:
 *   post:
 *     tags: [HumanCategories]
 *     summary: Create a new human category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               start_age:
 *                 type: integer
 *               finish_age:
 *                 type: integer
 *               gender_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Human Category created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/human-category", controller.createHumanCategory);

/**
 * @swagger
 * /api/human-category:
 *   get:
 *     tags: [HumanCategories]
 *     summary: Get all human categories
 *     responses:
 *       200:
 *         description: List of human categories
 *       500:
 *         description: Server error
 */
router.get("/human-category", controller.getAllHumanCategories);

/**
 * @swagger
 * /api/human-category/search:
 *   get:
 *     tags: [HumanCategories]
 *     summary: Search human categories
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of human categories matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/human-category/search", controller.searchHumanCategories);

/**
 * @swagger
 * /api/human-category/{id}:
 *   get:
 *     tags: [HumanCategories]
 *     summary: Get human category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Human Category ID
 *     responses:
 *       200:
 *         description: Human Category details
 *       404:
 *         description: Human Category not found
 *       500:
 *         description: Server error
 */
router.get("/human-category/:id", controller.getHumanCategoryById);

/**
 * @swagger
 * /api/human-category/{id}:
 *   put:
 *     tags: [HumanCategories]
 *     summary: Update human category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Human Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               start_age:
 *                 type: integer
 *               finish_age:
 *                 type: integer
 *               gender_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Human Category updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Human Category not found
 *       500:
 *         description: Server error
 */
router.put("/human-category/:id", controller.updateHumanCategory);

/**
 * @swagger
 * /api/human-category/{id}:
 *   delete:
 *     tags: [HumanCategories]
 *     summary: Delete human category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Human Category ID
 *     responses:
 *       200:
 *         description: Human Category deleted
 *       404:
 *         description: Human Category not found
 *       500:
 *         description: Server error
 */
router.delete("/human-category/:id", controller.deleteHumanCategory);

module.exports = router;
