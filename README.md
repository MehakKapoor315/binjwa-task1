# LandVista - Commercial Real Estate Platform
work flow::::::::------
Onboarding: A user submits a request (accessrequests).
Review: Admin approves it, creating a profile in users and logging it in auditlogs.
Compliance: Before seeing data, the user must sign the latest version in ndaversions. This creates a permanent, legally-binding record in ndarecords.
Access: Once signed, the user can pull intelligence from sensitivedatas, filtered by their assigned role.

DATABASE:::::------
users: Stores all authenticated personnel profiles.
accessrequests: Acts as an onboarding waiting room for new applicants.
ndaversions: Keeps different versions of the legal NDA text.
ndarecords: Maintains the audit trail of all digital signatures.
auditlogs: Stores global security logs for tracking and governance.
sensitivedatas: Works as an “intelligence vault” for restricted and confidential data.
## 📖 Overview
LandVista is a secure, full-stack web application tailored for commercial real estate management and governance. It serves as a centralized platform for managing properties, zones, and sensitive intelligence data while enforcing strict role-based access control (RBAC) and compliance through built-in Non-Disclosure Agreements (NDAs).

## ✨ Key Features
- **Secure Authentication & RBAC:** Secure user registration and login system with strict role management (Admin, Investor, Founder, Analyst).
- **NDA Management System:** Users are required to sign an NDA before accessing sensitive platform data. The system tracks NDA versions and user signatures.
- **Access Request Workflow:** A governance system where users can request elevated access, which Administrators can securely review, approve, or deny.
- **Audit Logging:** Comprehensive tracking of security events, access requests, and compliance actions to ensure total system governance.

## 💻 Tech Stack
**Frontend:**
- React.js (built with Vite for fast performance)
- Context API (for global state management)
- Modern CSS (responsive and dynamic UI)

**Backend:**
- Node.js & Express.js (RESTful API architecture)
- MongoDB & Mongoose (NoSQL Database)
- JSON Web Tokens (JWT) (for stateless authentication)

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v14 or higher)
- A [MongoDB](https://www.mongodb.com/) database (Local or Atlas)

### Installation & Setup

 **Clone the repository:**
   ```bash
   git clone https://github.com/MehakKapoor315/binjwa-task1.git
   cd binjwa-task1
Backend Setup:

bash
cd backend
npm install
Create a .env file in the backend directory and configure your environment variables:

env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Start the backend server:

bash
npm run dev
Frontend Setup: Open a new terminal window and navigate to the frontend folder:

bash
cd frontend
npm install
Start the Vite development server:

bash
npm run dev
📂 Project Structure
/backend: Contains the Node/Express server, including Mongoose models (User, NDA, Zone, AccessRequest), robust middleware for auth/roles, and RESTful API routes.
/frontend: Contains the React Vite application, including the UI components (NDAModal), authentication pages (Login, Signup, RequestAccess), and the main Dashboard.
