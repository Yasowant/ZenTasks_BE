

### ✅ `README.md`

````md
# 📝 Todo App Backend (GraphQL + REST)

This is a **full-stack Todo application backend** with:

- 🔁 REST API for todos
- 🔐 GraphQL for authentication (login/register)
- 🗂 MongoDB database
- 🛡 JWT-based authentication
- 📘 Swagger UI for REST documentation

---

## 🚀 Features

- ✅ User Registration & Login via GraphQL
- 🔐 JWT Access + Refresh Token System
- 📃 Todo CRUD via REST
- 📑 Swagger UI Documentation (`/api-docs`)
- 🧰 Production-ready setup

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create your `.env` file

```bash
cp .env.example .env
```

Then update `.env` with your actual credentials:

```env
PORT=5000
MONGO_URI=your_actual_mongo_uri
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
```

---

## 🚦 Run the App

### For development (with auto-reload):

```bash
npm run dev
```

### For production build:

```bash
npm run build
npm start
```

---

## 🔍 API Access

* **REST Docs (Swagger)**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
* **GraphQL Playground**: [http://localhost:5000/api/v1/graphql](http://localhost:5000/api/v1/graphql)

> If hosted on Render:
> 🟢 [https://todo-backend-y42y.onrender.com/api-docs](https://todo-backend-y42y.onrender.com/api-docs)

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

**Yasowant Nayak**
📧 [yasowant@example.com](mailto:yasowant@example.com)
🌐 Live API: [https://todo-backend-y42y.onrender.com](https://todo-backend-y42y.onrender.com)

