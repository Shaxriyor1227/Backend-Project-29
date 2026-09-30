const express = require("express");
const router = express.Router();
const controller = require("../controller/customer_card.controller");

/**
 * @swagger
 * tags:
 *   name: CustomerCards
 *   description: Customer card management
 */

/**
 * @swagger
 * /api/customer-card:
 *   post:
 *     tags: [CustomerCards]
 *     summary: Create a new customer card
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               number:
 *                 type: string
 *               year:
 *                 type: string
 *               month:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               is_main:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Customer Card created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/customer-card", controller.createCustomerCard);

/**
 * @swagger
 * /api/customer-card:
 *   get:
 *     tags: [CustomerCards]
 *     summary: Get all customer cards
 *     responses:
 *       200:
 *         description: List of customer cards
 *       500:
 *         description: Server error
 */
router.get("/customer-card", controller.getAllCustomerCards);

/**
 * @swagger
 * /api/customer-card/search:
 *   get:
 *     tags: [CustomerCards]
 *     summary: Search customer cards
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of customer cards matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/customer-card/search", controller.searchCustomerCards);

/**
 * @swagger
 * /api/customer-card/{id}:
 *   get:
 *     tags: [CustomerCards]
 *     summary: Get customer card by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Customer Card ID
 *     responses:
 *       200:
 *         description: Customer Card details
 *       404:
 *         description: Customer Card not found
 *       500:
 *         description: Server error
 */
router.get("/customer-card/:id", controller.getCustomerCardById);

/**
 * @swagger
 * /api/customer-card/{id}:
 *   put:
 *     tags: [CustomerCards]
 *     summary: Update customer card by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Customer Card ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               number:
 *                 type: string
 *               year:
 *                 type: string
 *               month:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               is_main:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Customer Card updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Customer Card not found
 *       500:
 *         description: Server error
 */
router.put("/customer-card/:id", controller.updateCustomerCard);

/**
 * @swagger
 * /api/customer-card/{id}:
 *   delete:
 *     tags: [CustomerCards]
 *     summary: Delete customer card by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Customer Card ID
 *     responses:
 *       200:
 *         description: Customer Card deleted
 *       404:
 *         description: Customer Card not found
 *       500:
 *         description: Server error
 */
router.delete("/customer-card/:id", controller.deleteCustomerCard);

module.exports = router;
