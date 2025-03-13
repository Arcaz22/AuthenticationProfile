/**
 * @swagger
 * /v1/user/current-user:
 *   get:
 *      summary: current user signin
 *      tags: [User]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *         200:
 *          description: success retrieve current user
 *         404:
 *          description: user not found
 *         500:
 *          description: error
 */
