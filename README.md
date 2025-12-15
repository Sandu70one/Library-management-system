# Library Management System (Lab tutorial No:10)

A full-stack library management application built with Spring Boot and React.

## Tech Stack

- **Client:** React, Vite, TypeScript, CSS
- **Server:** Java 17, Spring Boot 3.2.0, MongoDB

## Prerequisites

- Node.js & npm
- JDK 17+
- Maven
- MongoDB running locally on default port (27017)

## Getting Started

### 1. Backend (Server)

Navigate to the server directory and run the application:

```bash
cd server
mvn spring-boot:run
```

The server will start at `http://localhost:8080`.

### 2. Frontend (Client)

Navigate to the client directory, install dependencies, and start the dev server:

```bash
cd client
npm install
npm run dev
```

The client will typically run at `http://localhost:5173`.

## API Endpoints

Base URL: `/api/books`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/`      | Get all books |
| GET    | `/{id}`  | Get book by ID |
| POST   | `/`      | Add a new book |
| PUT    | `/{id}`  | Update a book |
| DELETE | `/{id}`  | Delete a book |
