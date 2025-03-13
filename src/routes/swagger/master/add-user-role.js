/**
 * @swagger
 * /v1/role/add-user-role:
 *   post:
 *      summary: Add role to user
 *      tags: [Role]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - user_id
 *                          - role_id
 *                      properties:
 *                          user_id:
 *                              type: integer
 *                              description: ID of the user
 *                              example: 1
 *                          role_id:
 *                              type: integer
 *                              description: ID of the role
 *                              example: 2
 *      responses:
 *         200:
 *          description: Role successfully added to user
 *         400:
 *          description: User already has this role
 *         404:
 *          description: User or role not found
 *         500:
 *          description: Internal server error
 */
