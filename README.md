<h1 align="center">
  <a href="https://expressjs.com/" target="blank"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg" height="100" alt="Express JS" /></a>
  <a href="https://sequelize.org/docs/v6/" target="blank"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sequelize/sequelize-original.svg" height="100" alt="Sequelize" /></a>
  <a href="https://www.postgresql.org/" target="blank"><img src="https://www.postgresql.org/media/img/about/press/elephant.png" height="100" alt="PostgreSQL" /></a>
  <a href="https://eslint.org/" target="blank"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eslint/eslint-original.svg" height="100" alt="Eslint" /></a>
  <a href="https://redis.io/" target="blank"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" height="100" alt="Redis" /></a>
  <a href="https://swagger.io/" target="blank"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg" height="100" alt="Swagger" /></a>
</h1>

<p align="center">Authentication Project Express Js</p>
<p align="center">
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
</p>

## Description

This project is a comprehensive authentication system built with Express.js, featuring:

- 🔐 Secure user authentication with JWT tokens
- 📧 Email verification with OTP
- 🔄 Refresh token mechanism
- 🚪 User registration and login
- 🔑 Password encryption with bcrypt
- 🌐 Google OAuth2 integration
- 📝 API documentation with Swagger
- 🗄️ PostgreSQL database with Sequelize ORM
- 🎯 Redis for OTP storage and caching
- 🔍 Request logging and error handling
- 🛡️ Security middleware with Helmet
- 🎨 Code formatting with Prettier and ESLint
- 📱 User profile management with avatar upload
- 🖼️ MinIO integration for file storage
- 👥 Role-based access control (admin/user roles)
- 📞 Phone number validation and formatting
- 🔒 Session management with refresh tokens
- 🎯 Request ID tracking for better debugging
- 📊 Pagination support for data queries

## Prerequisites

- Node >= v22.13.0
- Npm >= 10.9.2
- PostgreSQL
- Docker
- Redis
- MinIO

## Getting Started

```bash
# Clone repository Authentication Project Express Js
git clone https://github.com/Arcaz22/AuthenticationProfile.git

# Install dependencies
npm install

# Create environment variables
cp .env.example .env

# Running Redis docker
docker run -d --name redis_split_bill -p 6380:6379 --restart unless-stopped redis redis-server --requirepass "R4dis"

# Running Minio Docker
docker run -d --name minio_split_bill -p 9000:9000 -p 9001:9001 --restart unless-stopped \
-e MINIO_ACCESS_KEY=minio_split_bill \
-e MINIO_SECRET_KEY=minio_split_bill \
minio/minio server /data --console-address ':9001'

# Create database and run migrations
npm run db:create
npm run db:migrate

# Seed initial data
npm run db:seed:all

# Running API Development
npm run dev

# Documentation Access
https://localhost:port/docs
```

## Database Commands

```bash
# Create database
npm run db:create

# Drop database
npm run db:drop

# Run migrations
npm run db:migrate

# Rollback last migration
npm run db:rollback

# Rollback all migrations
npm run db:rollback:all

# Run seeders
npm run db:seed:all

# Create new model and migration
npx sequelize-cli model:generate --name user --attributes username:string,email:string

# Create new seeder
npx sequelize-cli seed:generate --name demo-user
```

## API Features

### Authentication
- Sign up with email verification
- Sign in with username/password
- Google OAuth2 login
- JWT token authentication
- Refresh token mechanism
- Logout

### User Management
- User profile creation and updates
- Avatar upload and management
- Role-based access control
- Phone number validation

### Security
- Password encryption with bcrypt
- JWT token validation
- Request logging
- Error handling
- CORS and Helmet security

### File Storage
- MinIO integration for file storage
- Avatar image upload
- Presigned URLs for secure access

### Caching
- Redis for OTP storage
- Efficient session management

## Environment Variables

Key environment variables needed in `.env`:

```env
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=auth
DB_DIALECT=postgres
DB_PORT=5432

# JWT
JWT_SECRET_KEY=your_jwt_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/v1/auth/google/callback

# Redis
REDIS_URL=redis://127.0.0.1:6380
REDIS_PASSWORD=R4dis

# MinIO
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minio_split_bill
MINIO_SECRET_KEY=minio_split_bill
```

## Docker Deployment

```bash
# Build image
docker build -t auth-split-bill .

# Run container
docker run -d \
  --name auth-split-bill \
  -p 3000:3000 \
  --env-file .env \
  --network host \
  auth-split-bill
```
