# Todo Management Application

A professional React-based Todo Management frontend with authentication, role-based access control, and a clean, modern UI.

## 🎯 Features

### Authentication
- User registration and login
- JWT-based authentication
- Persistent authentication state
- Protected routes
- Automatic logout on session expiry

### User Features
- View and update profile
- Create, read, update, and delete todos
- Paginated todo list
- Filter todos by status and priority
- Real-time status and priority updates

### Admin Features
- View all users
- Update user details and roles
- Delete users
- Admin-only dashboard access

### UI/UX
- Professional dark charcoal and bright yellow color scheme
- Responsive design
- Loading states and spinners
- Custom confirmation modals
- Toast notifications
- Form validation with Formik and Yup
- Smooth animations and transitions

## 🛠️ Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Formik** - Form handling
- **Yup** - Schema validation
- **Axios** - HTTP client
- **React Toastify** - Notifications

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🚀 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd todo-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=https://assignment.theregiment.in/api/v1
VITE_API_KEY=your-api-key-here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to:
```
http://localhost:5173
```

## 📁 Project Structure

```
src/
├── api/
│   └── axios.ts              # Axios configuration
├── assets/
│   └── background.jpg        # Background image
├── auth/
│   ├── AdminRoute.tsx        # Admin route guard
│   ├── AuthProvider.tsx      # Auth context provider
│   ├── ProtectedRoute.tsx    # Protected route guard
│   ├── PublicRoute.tsx       # Public route guard
│   ├── auth.context.ts       # Auth context
│   └── useAuth.ts            # Auth hook
├── components/
│   ├── Button.tsx            # Reusable button component
│   ├── ConfirmModal.tsx      # Confirmation modal
│   ├── Input.tsx             # Reusable input component
│   ├── Modal.tsx             # Generic modal component
│   └── Navbar.tsx            # Navigation bar
├── pages/
│   ├── AdminDashboard.tsx    # Admin dashboard page
│   ├── Login.tsx             # Login page
│   ├── Profile.tsx           # User profile page
│   ├── Signup.tsx            # Signup page
│   └── Todos.tsx             # Todos page
├── store/
│   ├── authSlice.ts          # Auth state slice
│   ├── store.ts              # Redux store configuration
│   └── todosSlice.ts         # Todos state slice
├── utils/
│   └── validation.ts         # Validation schemas
├── App.tsx                   # Main app component
├── index.css                 # Global styles
└── main.tsx                  # Entry point
```

## 🎨 Design System

### Color Palette
- **Primary (Dark Charcoal)**: #2d2d2d, #434343, #666666
- **Accent (Bright Yellow)**: #fbbf24, #f59e0b
- **Background**: White with subtle gradients
- **Text**: Gray scale for hierarchy

### Components
- Custom buttons with gradient backgrounds
- Form inputs with yellow focus states
- Professional confirmation modals
- Toast notifications with custom styling
- Animated loading spinners

## 🔐 Authentication Flow

1. User registers or logs in
2. JWT tokens stored in localStorage
3. Tokens attached to API requests via Axios interceptors
4. Protected routes check authentication status
5. Admin routes verify user role
6. Automatic logout on token expiry

## 📱 Pages

### Login & Signup
- Form validation
- Error handling
- Redirect to todos after login

### Todos Dashboard
- Create new todos
- View todos with pagination (5 per page)
- Update todo status and priority
- Delete todos with confirmation
- Empty state for no todos

### Profile
- View user information
- Update profile name
- Email displayed (read-only)

### Admin Dashboard
- View all users in a table
- Edit user name and role
- Delete users with confirmation
- Empty state for no users

## 🔧 Available Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🌐 API Integration

Base URL: `https://assignment.theregiment.in`

### Endpoints Used
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user
- `GET /users/me` - Get user profile
- `PATCH /users/me` - Update profile
- `POST /users` - Get all users (Admin)
- `PATCH /users/:id` - Update user (Admin)
- `DELETE /users/:id` - Delete user (Admin)
- `GET /todos` - Get todos
- `POST /todos/add` - Create todo
- `PATCH /todos/update/:id` - Update todo
- `DELETE /todos/delete/:id` - Delete todo

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_BASE_URL` | Backend API base URL | Yes |
| `VITE_API_KEY` | API key for authentication | Yes |

## 🚧 Error Handling

- API errors displayed via toast notifications
- Form validation errors shown inline
- Network errors handled gracefully
- 401 errors trigger automatic logout

## 📦 Build & Deployment

1. Build the project:
```bash
npm run build
```

2. The build output will be in the `dist/` directory

3. Deploy to your hosting service (Vercel, Netlify, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is part of an assignment for The Regiment.

## 👤 Author

Adarsh Dilip Raut

## 🙏 Acknowledgments

- The Regiment for the assignment
- Backend API provided by The Regiment
- React and Vite communities
