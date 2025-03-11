/**
 * @swagger
 * /v1/user/add-avatar-profile:
 *   post:
 *      summary: Add user avatar profile
 *      tags: [User]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          avatar:
 *                              description: avatar
 *                              type: string
 *                              format: binary
 *      responses:
 *         200:
 *          description: add avatar profile
 *         404:
 *          description: user not found
 *         500:
 *          description: error
 */
