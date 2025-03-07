/**
 * @swagger
 * /v1/auth/logout:
 *   post:
 *     summary: logout
 *     description: User logout
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */
