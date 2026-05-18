# Mini Service Request Board

A clean, modern, and production-style full-stack application for managing service requests. Built with the MERN stack (MongoDB, Express, Next.js, Node.js).

## 🚀 Features

- **Service Board**: Browse all active job requests with real-time search and category filtering.
- **Job Creation**: Post new service requests with form validation.
- **Job Details**: View full request details, including client contact information.
- **Status Management**: Update job status (Open, In Progress, Closed) from the detail view.
- **Modern UI**: Built with Tailwind CSS, featuring glassmorphism, responsive design, and smooth hover effects.
- **Error Handling**: Global error boundary and standardized API responses.
- **Seed Data**: Includes a script to populate the database with sample data.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Axios, Lucide React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)

## 📂 Project Structure

### Backend
```
backend/
 ├── config/         # Database connection
 ├── controllers/    # API logic
 ├── middleware/     # Custom middleware (auth, error, etc.)
 ├── models/         # Mongoose schemas
 ├── routes/         # Express routes
 ├── utils/          # Helper classes
 └── server.js       # Entry point
```

### Frontend
```
frontend/
 ├── app/            # Next.js App Router pages
 ├── components/     # Reusable UI components
 ├── services/       # API interaction layer (Axios)
 └── utils/          # Utility functions
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure `.env`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```
4. Seed the database (optional):
   ```bash
   node seed.js
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📖 API Documentation

- `GET /api/jobs`: Fetch all jobs (supports `?category=` and `?status=` filters)
- `GET /api/jobs/:id`: Fetch a single job by ID
- `POST /api/jobs`: Create a new job request
- `PATCH /api/jobs/:id`: Update job status
- `DELETE /api/jobs/:id`: Delete a job request

## 🚢 Deployment Guide

### Frontend (Vercel)
1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Set the Environment Variable: `NEXT_PUBLIC_API_URL` (your deployed backend URL).
4. Click Deploy.

### Backend (Render)
1. Push your code to GitHub.
2. Create a new "Web Service" on Render.
3. Select your repository.
4. Set the Build Command: `npm install`
5. Set the Start Command: `node server.js`
6. Add Environment Variables: `MONGO_URI`, `PORT`, `NODE_ENV`.
7. Click Deploy.

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).