/**
 * @swagger
 * /v1/auth/google:
 *   get:
 *     summary: Sign in with Google
 *     description: |
 *       Untuk menggunakan fitur login Google:
 *       1. Buka URL berikut di browser baru: http://localhost:3000/v1/auth/google
 *       2. Login menggunakan akun Google Anda
 *       3. Setelah berhasil, Anda akan diarahkan kembali ke aplikasi
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirect ke halaman login Google
 *         headers:
 *           Location:
 *             schema:
 *               type: string
 *               example: https://accounts.google.com/o/oauth2/v2/auth?...
 *       500:
 *         description: Terjadi kesalahan server
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
