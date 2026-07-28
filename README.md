# Mukurtham

Mukurtham is a starter Node.js + Express API architecture for wedding hall booking and event management.

## Architecture Overview

This project is organized to separate concerns cleanly for a booking application:

- `src/config` : application configuration and environment settings
- `src/routes` : route definitions and HTTP endpoints
- `src/controllers` : request handlers and controller logic
- `src/services` : business logic and service layer
- `src/models` : data models, persistence adapters, and domain entities
- `src/middleware` : Express middleware for error handling, request lifecycle, and validation
- `src/utils` : reusable utilities such as logging
- `src/validators` : input validation rules and helpers

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and update values as needed.

3. Start the server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000/api/` to verify the service.

## Folder Structure

```
.
├── src
│   ├── config
│   │   └── jwt.js
│   ├── controllers
│   │   └── users/user.controller.js
│   ├── middleware
│   │   ├── not-found.middleware.js
│   ├── models
│   │   └── userModel.js
│   ├── routes
│   │   ├── route.js
│   ├── services
│   │   └── users/user.service.js
│   ├── utils
│   │   └── response.js
│   ├── validators
│   │   └── users/user.validator.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```
