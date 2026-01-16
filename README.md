# GigFlow

GigFlow is a full-stack freelancing platform where clients can post gigs and freelancers can bid on them.
## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication (HttpOnly Cookies)

### Tools
- Git & GitHub
- Axios

## Features

### Authentication
- User Registration & Login
- JWT-based authentication using HttpOnly cookies
- Protected routes

### Gig System
- Create gigs (Client)
- View all open gigs
- Search gigs by title

### Bidding System
- Freelancers can submit bids
- Gig owners can view bids
- One-click hire functionality

### Hire Logic
- Only gig owner can hire a freelancer
- Selected bid is marked as hired
- Other bids are rejected automatically

## Folder Structure

gigflow/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── app.js
│   ├── server.js
│   ├── .env
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── api.js
│   ├── index.html
│   └── vite.config.js

## Environment Variables

Create a `.env` file in backend directory using `.env.example`

Example:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

## How to Run Locally

### Backend
```bash
cd backend
npm install
npm run dev

cd frontend
npm install
npm run dev


---

### 🔹 7. Assignment Note 
```md
## Assignment Note

This project was developed as part of a Full Stack Developer assignment.
The focus was on backend logic, authentication security, and real-world workflows
rather than UI perfection.



