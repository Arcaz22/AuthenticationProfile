/**
 * @swagger
 * /v1/otp/verify:
 *   post:
 *      summary: Verify otp
 *      tags: [Otp]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              description: email address
 *                              type: string
 *                              example: admin1@gmail.com
 *                          otp:
 *                              description: otp code in email
 *                              type: string
 *                              example: 123456
 *      responses:
 *         200:
 *          description: otp verified
 *         400:
 *          description: invalid otp
 *         404:
 *          description: user not found
 *         500:
 *          description: error
 */
