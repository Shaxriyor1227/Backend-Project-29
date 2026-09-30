const express = require("express");
const router = express.Router();
const controller = require("../controller/cart_item.controller");

/**
 * @swagger
 * tags:
 *   name: CartItems
 *   description: Cart item management
 */

/**
 * @swagger
 * /api/cart-item:
 *   post:
 *     tags: [CartItems]
 *     summary: Create a new cart item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_id:
 *                 type: integer
 *               cart_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Cart Item created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/cart-item", controller.createCartItem);

/**
 * @swagger
 * /api/cart-item:
 *   get:
 *     tags: [CartItems]
 *     summary: Get all cart items
 *     responses:
 *       200:
 *         description: List of cart items
 *       500:
 *         description: Server error
 */
router.get("/cart-item", controller.getAllCartItems);

/**
 * @swagger
 * /api/cart-item/search:
 *   get:
 *     tags: [CartItems]
 *     summary: Search cart items
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of cart items matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/cart-item/search", controller.searchCartItems);

/**
 * @swagger
 * /api/cart-item/{id}:
 *   get:
 *     tags: [CartItems]
 *     summary: Get cart item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Cart Item ID
 *     responses:
 *       200:
 *         description: Cart Item details
 *       404:
 *         description: Cart Item not found
 *       500:
 *         description: Server error
 */
router.get("/cart-item/:id", controller.getCartItemById);

/**
 * @swagger
 * /api/cart-item/{id}:
 *   put:
 *     tags: [CartItems]
 *     summary: Update cart item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Cart Item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_id:
 *                 type: integer
 *               cart_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cart Item updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Cart Item not found
 *       500:
 *         description: Server error
 */
router.put("/cart-item/:id", controller.updateCartItem);

/**
 * @swagger
 * /api/cart-item/{id}:
 *   delete:
 *     tags: [CartItems]
 *     summary: Delete cart item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Cart Item ID
 *     responses:
 *       200:
 *         description: Cart Item deleted
 *       404:
 *         description: Cart Item not found
 *       500:
 *         description: Server error
 */
router.delete("/cart-item/:id", controller.deleteCartItem);

module.exports = router;
