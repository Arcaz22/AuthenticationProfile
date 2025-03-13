/**
 * @swagger
 * /v1/user/update-avatar-profile:
 *   put:
 *      summary: Update user avatar profile
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
 *                              description: New avatar file
 *                              type: string
 *                              format: binary
 *      responses:
 *         200:
 *          description: Avatar successfully updated
 *         404:
 *          description: Profile not found
 *         400:
 *          description: Invalid file format or size
 *         500:
 *          description: Internal server error
 */
