/**
 * @swagger
 * /v1/auth/refresh-token:
 *   post:
 *      summary: refresh token
 *      tags: [Auth]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          refresh_token:
 *                              description: refresh token
 *                              type: string
 *                              example: 1//0geSf1IiI2-evCgYIARAAGBASNwF-L9IrCf200ImNhpWawDSB3RQyWP7zn7nKCEMYzArvxFGLyqzLAhfzn4oJNnjSM-tCWCiC5CU
 *      responses:
 *         200:
 *          description: signin success
 *         401:
 *          description: invalid credentials
 *         500:
 *          description: error
 */
