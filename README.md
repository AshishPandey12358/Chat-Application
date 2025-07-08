
# 💬 Quick Chat – Real-Time Chat App

A full-stack real-time chat application built with:

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express + MongoDB
- **Realtime:** Socket.IO
- **Cloud Storage:** Cloudinary

---

## 🚀 Features

- User authentication (signup/login)
- Real-time 1-on-1 messaging
- Send/receive images
- View profile and update bio/picture
- Seen/unseen message system
- Online users indicator
- Media gallery per chat
- Mobile responsive UI

---

## 📁 Folder Structure
```
chat-app/
├── client/                     # Frontend (React + Vite + Tailwind)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env                   # VITE_BACKEND_URL
│   ├── index.html
│   ├── vite.config.js
│   ├── vercel.json
│   └── package.json
│
├── server/                    # Backend (Node.js + Express + MongoDB + Socket.IO)
│   ├── controllers/
│   ├── lib/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   ├── vercel.json
│   └── package.json
│
├── README.md
└── .gitignore
```
# Setup Backend
```
cd server
npm install
```
🔐 Configure .env
Create a .env file in /server:
```
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

▶️ Start Backend Server
npm start


# Setup Frontend
```
cd ../client
npm install
```

🌐 Configure .env
Create a .env file in /client:
VITE_BACKEND_URL=http://localhost:5000

▶️ Start Frontend Dev Server
npm run dev



# 📚 Tech Stack
| Frontend              | Backend       | Realtime  | DB      | Image Upload |
| --------------------- | ------------- | --------- | ------- | ------------ |
| React, Vite, Tailwind | Node, Express | Socket.IO | MongoDB | Cloudinary   |





