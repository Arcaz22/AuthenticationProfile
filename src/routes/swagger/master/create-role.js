/**
 * @swagger
 * /v1/role/create-role:
 *   post:
 *      summary: Add role
 *      tags: [Role]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              description: username
 *                              type: string
 *                              example: sekertaris
 *      responses:
 *         200:
 *          description: add role success
 *         400:
 *          description: role already exist
 *         500:
 *          description: error
 */
