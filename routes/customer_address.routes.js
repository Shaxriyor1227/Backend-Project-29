const express = require("express");
const router = express.Router();
const controller = require("../controller/customer_address.controller");

/**
 * @swagger
 * tags:
 *   name: CustomerAddresses
 *   description: Customer address management
 */

/**
 * @swagger
 * /api/customer-address:
 *   post:
 *     tags: [CustomerAddresses]
 *     summary: Create a new customer address
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
 *               region_id:
 *                 type: integer
 *               district_id:
 *                 type: integer
 *               street:
 *                 type: string
 *               house:
 *                 type: string
 *               flat_id:
 *                 type: integer
 *               location:
 *                 type: string
 *               post_index:
 *                 type: string
 *               info:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer Address created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/customer-address", controller.createCustomerAddress);

/**
 * @swagger
 * /api/customer-address:
 *   get:
 *     tags: [CustomerAddresses]
 *     summary: Get all customer addresses
 *     responses:
 *       200:
 *         description: List of customer addresses
 *       500:
 *         description: Server error
 */
router.get("/customer-address", controller.getAllCustomerAddresses);

/**
 * @swagger
 * /api/customer-address/search:
 *   get:
 *     tags: [CustomerAddresses]
 *     summary: Search customer addresses
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of customer addresses matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/customer-address/search", controller.searchCustomerAddresses);

/**
 * @swagger
 * /api/customer-address/{id}:
 *   get:
 *     tags: [CustomerAddresses]
 *     summary: Get customer address by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Customer Address ID
 *     responses:
 *       200:
 *         description: Customer Address details
 *       404:
 *         description: Customer Address not found
 *       500:
 *         description: Server error
 */
router.get("/customer-address/:id", controller.getCustomerAddressById);

/**
 * @swagger
 * /api/customer-address/{id}:
 *   put:
 *     tags: [CustomerAddresses]
 *     summary: Update customer address by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Customer Address ID
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
 *               region_id:
 *                 type: integer
 *               district_id:
 *                 type: integer
 *               street:
 *                 type: string
 *               house:
 *                 type: string
 *               flat_id:
 *                 type: integer
 *               location:
 *                 type: string
 *               post_index:
 *                 type: string
 *               info:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer Address updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Customer Address not found
 *       500:
 *         description: Server error
 */
router.put("/customer-address/:id", controller.updateCustomerAddress);

/**
 * @swagger
 * /api/customer-address/{id}:
 *   delete:
 *     tags: [CustomerAddresses]
 *     summary: Delete customer address by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Customer Address ID
 *     responses:
 *       200:
 *         description: Customer Address deleted
 *       404:
 *         description: Customer Address not found
 *       500:
 *         description: Server error
 */
router.delete("/customer-address/:id", controller.deleteCustomerAddress);

module.exports = router;
