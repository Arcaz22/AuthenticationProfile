/**
 * @swagger
 * /v1/user/get-all-user:
 *   get:
 *      summary: get all user
 *      tags: [User]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            default: 1
 *          description: Page number to retrieve
 *        - in: query
 *          name: perPage
 *          schema:
 *            type: integer
 *            default: 10
 *          description: Number of items per page
 *        - in: query
 *          name: search
 *          schema:
 *            type: string
 *          description: Search by username or email
 *        - in: query
 *          name: role
 *          schema:
 *            type: string
 *          description: Filter by role name
 *        - in: query
 *          name: sortOrder
 *          schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *          description: Sort order (ASC or DESC)
 *      responses:
 *         200:
 *          description: success retrieve all user
 *         500:
 *          description: error
 */
