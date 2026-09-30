const express = require("express");
const router = express.Router();
const controller = require("../controller/discount.controller");

/**
 * @swagger
 * tags:
 *   name: Discounts
 *   description: Discount management
 */

/**
 * @swagger
 * /api/discount:
 *   post:
 *     tags: [Discounts]
 *     summary: Create a new discount
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discount:
 *                 type: string
 *               finish_date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Discount created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/discount", controller.createDiscount);

/**
 * @swagger
 * /api/discount:
 *   get:
 *     tags: [Discounts]
 *     summary: Get all discounts
 *     responses:
 *       200:
 *         description: List of discounts
 *       500:
 *         description: Server error
 */
router.get("/discount", controller.getAllDiscounts);

/**
 * @swagger
 * /api/discount/search:
 *   get:
 *     tags: [Discounts]
 *     summary: Search discounts
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of discounts matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/discount/search", controller.searchDiscounts);

/**
 * @swagger
 * /api/discount/{id}:
 *   get:
 *     tags: [Discounts]
 *     summary: Get discount by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Discount ID
 *     responses:
 *       200:
 *         description: Discount details
 *       404:
 *         description: Discount not found
 *       500:
 *         description: Server error
 */
router.get("/discount/:id", controller.getDiscountById);

/**
 * @swagger
 * /api/discount/{id}:
 *   put:
 *     tags: [Discounts]
 *     summary: Update discount by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Discount ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discount:
 *                 type: string
 *               finish_date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Discount updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Discount not found
 *       500:
 *         description: Server error
 */
router.put("/discount/:id", controller.updateDiscount);

/**
 * @swagger
 * /api/discount/{id}:
 *   delete:
 *     tags: [Discounts]
 *     summary: Delete discount by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Discount ID
 *     responses:
 *       200:
 *         description: Discount deleted
 *       404:
 *         description: Discount not found
 *       500:
 *         description: Server error
 */
router.delete("/discount/:id", controller.deleteDiscount);

module.exports = router;
