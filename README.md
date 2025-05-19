# 🎓 VirtualGuruji

**VirtualGuruji** is a fully functional **ed-tech platform** built with the **MERN** stack (MongoDB, Express.js, React.js, and Node.js). It enables users to create, consume, and rate educational content, offering an immersive and interactive learning experience for students and a feature-rich content delivery system for instructors.

---

## 🚀 Features

### 👩‍🎓 For Students
- Browse and enroll in courses
- View video-based course content
- Add courses to wishlist
- Secure checkout with Razorpay
- Edit profile and view learning progress

### 🧑‍🏫 For Instructors
- Create, edit, and manage courses
- Upload media using Cloudinary
- Track insights and course metrics
- Edit personal and course details

### 🛠 For Admin (Future Scope)
- View platform-wide metrics
- Manage users and instructors
- Moderate content and course listings

---

## 🏗 Tech Stack

### Frontend
- **ReactJS**, **Redux** for state management
- **Tailwind CSS** for responsive UI

### Backend
- **Node.js**, **Express.js**
- **MongoDB** with **Mongoose ODM**
- **JWT**, **Bcrypt** for auth and security
- **Cloudinary** for media handling

---

## 🔐 Core Functionalities

- Email-based Sign Up/Login with JWT Auth
- OTP verification and password reset
- Course ratings and reviews
- Markdown-based rich text content
- Payment integration with **Razorpay**

---

## 📦 REST API Overview

Example Endpoints:
- `POST /api/auth/signup` – Register user
- `POST /api/auth/login` – Login and receive token
- `GET /api/courses` – Get all courses
- `POST /api/courses` – Create a new course
- `POST /api/courses/:id/rate` – Rate a course

Each endpoint follows RESTful principles and returns JSON responses.

---

## 🔮 Future Enhancements

- 📱 Mobile App (High Priority)
- 🧠 AI-powered course recommendations
- 🏆 Gamification with badges and leaderboards
- 💬 Social learning: discussions, peer feedback
- 🧑‍🎓 Personalized learning paths
- 🕶 AR/VR integration for immersive learning

---

## 📌 Project Status

The core functionality of VirtualGuruji is complete, and further enhancements are planned to elevate the platform into a fully-featured global e-learning solution.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

---

## 📃 License

This project is licensed under the MIT License.

---

## 🧑‍💻 Developed by

**CodeHelp Team**  
Date: 17-Feb-2023
