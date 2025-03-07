/**
 * @swagger
 * /v1/auth/signin:
 *   post:
 *      summary: signin user with username and password
 *      tags: [Auth]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              description: username
 *                              type: string
 *                              example: admin1
 *                          password:
 *                              description: user password
 *                              type: string
 *                              example: password
 *      responses:
 *         200:
 *          description: signin success
 *         401:
 *          description: invalid credentials
 *         404:
 *          description: user not found
 *         500:
 *          description: error
 */
