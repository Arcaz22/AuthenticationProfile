/**
 * @swagger
 * /v1/auth/signup:
 *   post:
 *      summary: signup user
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
 *                              example: testing
 *                          email:
 *                              description: username
 *                              type: string
 *                              example: testing@gmail.com
 *                          password:
 *                              description: user password
 *                              type: string
 *                              example: Password123!
 *                          confirm_password:
 *                              description: user password
 *                              type: string
 *                              example: Password123!
 *      responses:
 *         200:
 *          description: signup success
 *         400:
 *          description: password not match
 *         409:
 *          description: user already exist
 *         500:
 *          description: error
 */
