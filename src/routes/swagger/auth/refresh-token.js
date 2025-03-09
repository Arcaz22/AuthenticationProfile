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
 *                              example: e0geSfADWevCASDWASGBASNwF-L9IrCf2SAWAS7nKCEMYzArvxFGLyqzLAASDDWC5CU
 *      responses:
 *         200:
 *          description: signin success
 *         401:
 *          description: invalid credentials
 *         500:
 *          description: error
 */
