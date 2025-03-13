/**
 * @swagger
 * /v1/user/add-profile:
 *   post:
 *      summary: Add user profile
 *      tags: [User]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          full_name:
 *                              description: username
 *                              type: string
 *                              example: admin1
 *                          phone:
 *                              description: user password
 *                              type: string
 *                              example: 89273362152
 *                          gender:
 *                              description: user password
 *                              type: string
 *                              example: Pria
 *      responses:
 *         200:
 *          description: add profile success
 *         404:
 *          description: user not found
 *         500:
 *          description: error
 */
