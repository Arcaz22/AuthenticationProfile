/**
 * @swagger
 * /v1/auth/google:
 *   post:
 *      summary: signin user with google
 *      tags: [Auth]
 *      responses:
 *         200:
 *          description: direct to google login page
 *         500:
 *          description: error
 */

/**
 * @swagger
 * /v1/auth/google/callback:
 *   get:
 *      summary: google callback
 *      tags: [Auth]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          code:
 *                              description: code
 *                              type: string
 *                              example: 4%2F0AQSTgQGH7iF0VCsoJtJNnnzh_hgF7qwl8vxTuowyu6VlDfHSg9ssMJE0aUUBTMJtfAnLXA
 *      responses:
 *         200:
 *          description: signin success
 *         500:
 *          description: error
 */
