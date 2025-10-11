# BoligKalender App

This repository provides a full-stack development environment using Docker Compose, featuring:

- **nginx**: Reverse proxy for frontend and backend
- **app**: React frontend (Vite)
- **api**: ASP.NET Core backend
- **db**: PostgreSQL database

---

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Services](#services)
- [Environment Variables](#environment-variables)
- [Volumes & Networks](#volumes--networks)
- [Deployment](#deployment)

---

## Getting Started

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/bolig-kalender.git
   cd bolig-kalender
   ```

2. **Copy and configure environment variables:**

   ```sh
   cp .env.template .env
   # Edit .env as needed
   ```

3. **Start the development environment:**

   ```sh
   docker compose -f docker-compose.dev.yml up --build
   ```

4. **Access the services:**
   - Frontend: [http://localhost:8000](http://localhost:8000)
   - API: [http://localhost:4000](http://localhost:4000)
   - PostgreSQL: `localhost:5432`

---

## Project Structure

```
.
├── asp-net-core-project/   # ASP.NET Core backend
├── vite-project/           # React frontend (Vite)
├── nginx/                  # Nginx configuration
├── docker-compose.dev.yml  # Docker Compose file for development
├── .env.template           # Example environment variables
└── README.md
```

---

## Usage

- **Build and run all services:**
  ```sh
  docker compose -f docker-compose.dev.yml up --build
  ```
- **Stop and remove containers, networks, and volumes:**
  ```sh
  docker compose -f docker-compose.dev.yml down -v
  ```

---

## Services

| Service | Description           | Port(s) |
| ------- | --------------------- | ------- |
| nginx   | Reverse proxy         | 8000    |
| app     | React frontend (Vite) | 3000    |
| api     | ASP.NET Core backend  | 4000    |
| db      | PostgreSQL database   | 5432    |

---

## Environment Variables

Copy `.env.template` to `.env` and set:

- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- (Add others as needed)

---

## Volumes & Networks

- **Volumes:**  
  `db_data_dev` – Persists PostgreSQL data

- **Networks:**  
  `network` – Custom bridge for inter-service communication

---

## Deployment

...
