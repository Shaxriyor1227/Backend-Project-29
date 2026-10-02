const express = require("express");
const router = express.Router();
const controller = require("../controller/payment_method.controller");

/**
 * @swagger
 * tags:
 *   name: PaymentMethods
 *   description: Payment method management
 */

/**
 * @swagger
 * /api/payment-method:
 *   post:
 *     tags: [PaymentMethods]
 *     summary: Create a new payment method
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
 *         description: Payment Method created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/payment-method", controller.createPaymentMethod);

/**
 * @swagger
 * /api/payment-method:
 *   get:
 *     tags: [PaymentMethods]
 *     summary: Get all payment methods
 *     responses:
 *       200:
 *         description: List of payment methods
 *       500:
 *         description: Server error
 */
router.get("/payment-method", controller.getAllPaymentMethods);

/**
 * @swagger
 * /api/payment-method/search:
 *   get:
 *     tags: [PaymentMethods]
 *     summary: Search payment methods
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of payment methods matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/payment-method/search", controller.searchPaymentMethods);

/**
 * @swagger
 * /api/payment-method/{id}:
 *   get:
 *     tags: [PaymentMethods]
 *     summary: Get payment method by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Payment Method ID
 *     responses:
 *       200:
 *         description: Payment Method details
 *       404:
 *         description: Payment Method not found
 *       500:
 *         description: Server error
 */
router.get("/payment-method/:id", controller.getPaymentMethodById);

/**
 * @swagger
 * /api/payment-method/{id}:
 *   put:
 *     tags: [PaymentMethods]
 *     summary: Update payment method by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Payment Method ID
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
 *         description: Payment Method updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Payment Method not found
 *       500:
 *         description: Server error
 */
router.put("/payment-method/:id", controller.updatePaymentMethod);

/**
 * @swagger
 * /api/payment-method/{id}:
 *   delete:
 *     tags: [PaymentMethods]
 *     summary: Delete payment method by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Payment Method ID
 *     responses:
 *       200:
 *         description: Payment Method deleted
 *       404:
 *         description: Payment Method not found
 *       500:
 *         description: Server error
 */
router.delete("/payment-method/:id", controller.deletePaymentMethod);

module.exports = router;
