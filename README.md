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

## Prerequisites

- Node >= v22.13.0
- Npm >= 10.9.2
- PostgreSQL
- Docker

## Getting Started

```bash
# Clone repository Authentication Project Express Js
git clone https://github.com/Arcaz22/AuthenticationProfile.git

# Create environtment variabel
cp .env.example .env

# Running Redis docker
docker run -d --name redis_split_bill -p 6380:6379 --restart unless-stopped redis redis-server --requirepass "R4dis"

# Running API Development
npm run dev

# Documentation Access
https://localhost:port/docs
```

## Sequilize CLI

```bash
# Create model and migration
npx sequelize-cli model:generate --name namatabel --attributes field1:string,field2:string

# Create Seeder
npx sequelize-cli seed:generate --name namaseeder

# For more deteail cek (./package.json)
```
