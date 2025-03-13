/**
 * @swagger
 * /v1/role/get-all-role:
 *   get:
 *      summary: get all roles
 *      tags: [Role]
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
 *          description: Search by role name
 *        - in: query
 *          name: sortOrder
 *          schema:
 *            type: string
 *            enum: [ASC, DESC]
 *            default: ASC
 *          description: Sort order (ASC or DESC)
 *      responses:
 *         200:
 *          description: success retrieve all roles
 *         500:
 *          description: error
 */
