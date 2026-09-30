const express = require("express");
const router = express.Router();
const controller = require("../controller/delivery_method.controller");

/**
 * @swagger
 * tags:
 *   name: DeliveryMethods
 *   description: Delivery method management
 */

/**
 * @swagger
 * /api/delivery-method:
 *   post:
 *     tags: [DeliveryMethods]
 *     summary: Create a new delivery method
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
 *         description: Delivery Method created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/delivery-method", controller.createDeliveryMethod);

/**
 * @swagger
 * /api/delivery-method:
 *   get:
 *     tags: [DeliveryMethods]
 *     summary: Get all delivery methods
 *     responses:
 *       200:
 *         description: List of delivery methods
 *       500:
 *         description: Server error
 */
router.get("/delivery-method", controller.getAllDeliveryMethod);

/**
 * @swagger
 * /api/delivery-method/search:
 *   get:
 *     tags: [DeliveryMethods]
 *     summary: Search delivery methods
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of delivery methods matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/delivery-method/search", controller.searchDeliveryMethod);

/**
 * @swagger
 * /api/delivery-method/{id}:
 *   get:
 *     tags: [DeliveryMethods]
 *     summary: Get delivery method by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Delivery Method ID
 *     responses:
 *       200:
 *         description: Delivery Method details
 *       404:
 *         description: Delivery Method not found
 *       500:
 *         description: Server error
 */
router.get("/delivery-method/:id", controller.getDeliveryMethodById);

/**
 * @swagger
 * /api/delivery-method/{id}:
 *   put:
 *     tags: [DeliveryMethods]
 *     summary: Update delivery method by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Delivery Method ID
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
 *         description: Delivery Method updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Delivery Method not found
 *       500:
 *         description: Server error
 */
router.put("/delivery-method/:id", controller.updateDeliveryMethod);

/**
 * @swagger
 * /api/delivery-method/{id}:
 *   delete:
 *     tags: [DeliveryMethods]
 *     summary: Delete delivery method by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Delivery Method ID
 *     responses:
 *       200:
 *         description: Delivery Method deleted
 *       404:
 *         description: Delivery Method not found
 *       500:
 *         description: Server error
 */
router.delete("/delivery-method/:id", controller.deleteDeliveryMethod);

module.exports = router;
