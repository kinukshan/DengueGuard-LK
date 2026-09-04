# DengueGuard LK

**Community Dengue Breeding-Site Reporting & Monitoring System**

## Project Overview

DengueGuard LK is a community-driven web application designed to help citizens report and monitor potential dengue mosquito breeding sites across Sri Lanka. By enabling crowd-sourced reporting, the system aims to support early detection and prevention of dengue outbreaks.

## Problem

Dengue fever remains a significant public health threat in Sri Lanka. Identifying and eliminating mosquito breeding sites is critical to controlling outbreaks, but health authorities cannot monitor every location. Communities need a simple and accessible way to report potential breeding sites so that preventive action can be taken quickly.

## Proposed Solution

DengueGuard LK provides a web-based platform where community members can:

- Report potential dengue breeding sites with location details and descriptions
- Search and browse reported breeding sites
- Track the status of reports (pending, in progress, resolved)
- View a dashboard with summary statistics and trends

## Technology Stack

| Layer            | Technology              |
|------------------|-------------------------|
| **Frontend**     | React.js, Vite          |
| **Backend**      | Node.js, Express.js     |
| **Database**     | MongoDB Atlas, Mongoose  |
| **Frontend Deployment** | Vercel           |
| **Backend Deployment**  | Railway          |
| **Version Control**     | GitHub           |

## Project Structure

```
DengueGuard-LK/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
```

## Local Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account and cluster

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Copy the example environment file
cp .env.example .env

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`.

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy the example environment file and add your MongoDB connection string
cp .env.example .env

# Start the development server
npm run dev
```

The backend will be available at `http://localhost:5000`.

## Environment Variables

### Frontend (`frontend/.env`)

| Variable        | Description                  | Default                        |
|-----------------|------------------------------|--------------------------------|
| `VITE_API_URL`  | Backend API base URL         | `http://localhost:5000/api`    |

### Backend (`backend/.env`)

| Variable       | Description                          | Default / Example                    |
|----------------|--------------------------------------|--------------------------------------|
| `PORT`         | Server port                          | `5000`                               |
| `MONGODB_URI`  | MongoDB Atlas connection string      | `your_mongodb_atlas_connection_string` |
| `CLIENT_URL`   | Frontend URL (for CORS)              | `http://localhost:5173`              |

> **⚠️ Important:** Never commit `.env` files containing real credentials. Only `.env.example` files are tracked in version control.

## Team Development Workflow

The `main` branch contains the common starter structure. Team members should create feature branches for their work.

### Branch Structure

```
main
├── feature/report-creation
├── feature/report-search
├── feature/report-management
└── feature/dashboard
```

### Workflow Steps

1. Pull the latest `main` branch
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Implement your feature
4. Commit and push your branch
5. Create a Pull Request to merge into `main`
6. Get code reviewed by at least one team member before merging

## Deployment Plan

| Component  | Platform | URL Pattern                     |
|------------|----------|---------------------------------|
| Frontend   | Vercel   | `https://dengueguard-lk.vercel.app` |
| Backend    | Railway  | `https://dengueguard-lk.up.railway.app` |
| Database   | MongoDB Atlas | Cloud-hosted cluster       |

Deployment will be configured after feature development is complete.

## Team

| Member | Role | Feature Branch |
|--------|------|----------------|
| TBD    | TBD  | TBD            |
| TBD    | TBD  | TBD            |
| TBD    | TBD  | TBD            |
| TBD    | TBD  | TBD            |

---

*This project is developed as part of a university mini hackathon.*
