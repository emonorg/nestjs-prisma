# NestJS with Prisma and e2e testing

This project is an example of a NestJS application using Prisma as the ORM and Zod for schema validation. The application includes features such as setting up Zod schemas for request validation, integration tests, and ensuring a clean architecture.

## Table of Contents

- [NestJS Prisma Zod Example](#nestjs-with-prisma-and-e2e-testing)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
  - [Running Tests](#running-tests)
    - [E2E Tests](#e2e-tests)
  - [Creating Migrations](#creating-migrations)

## Features

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **Prisma**: Next-generation ORM for Node.js and TypeScript.
- **Zod**: TypeScript-first schema declaration and validation library.
- **Integration Tests**: Ensuring a clean separation between development and test databases.
- **Custom Validation Decorators**: Streamlined application of Zod schemas and validation pipes.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

## Configuration

1. Copy `.env.example` to `.env` and update the environment variables:

   ```bash
   cp .env.example .env
   ```

2. Copy `.env.example` to `.env.test` for the test environment:

   ```bash
   cp .env.example .env.test.local
   ```

3. Update the `DATABASE_URL` in both `.env` and `.env.test.local` with your database connection strings.

## Running the Application

1. Run database migrations for dev environment:

   ```bash
   npm run migrate:dev
   ```

2. Start the application:
   ```bash
   npm run start:dev
   ```

## Running Tests

### E2E Tests

Run database migrations for the test database:

```bash
pnpm migrate:local-test
```

Run e2e tests using Jest:

```bash
npm run test:e2e
```

### Creating Migrations

To create a new migration, run:

```bash
pnpx prisma migrate dev --name <migration-name>
```
