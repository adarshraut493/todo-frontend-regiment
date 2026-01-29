# Todo Management Application - Documentation

## 📌 Project Overview

A professional React-based Todo Management application with authentication, role-based access control, and a modern UI built for The Regiment assignment.

**Live Demo**: [Add your deployed URL here]  
**GitHub Repository**: [Add your GitHub URL here]

---

## ✅ Assignment Requirements Completion

### Mandatory Requirements

#### 1. Authentication UI ✓
- ✅ Signup page with form validation
- ✅ Login page with form validation
- ✅ Logout functionality
- ✅ JWT-based authentication with localStorage persistence
- ✅ Automatic redirect for unauthenticated users
- ✅ Session expiry handling with automatic logout

#### 2. Role-Based UI ✓
- ✅ Dynamic UI based on user role (USER/ADMIN)
- ✅ Admin-only navigation and pages
- ✅ Protected admin routes on frontend
- ✅ Role-based access control implemented

#### 3. User Features ✓
- ✅ View profile page
- ✅ Update profile (name)
- ✅ Email displayed (read-only)
- ⚠️ Soft delete account - API endpoint not available in backend

#### 4. Todo Features ✓
- ✅ Create todos with title and description
- ✅ View todos with pagination (5 per page)
- ✅ Update todo status (pending, in_progress, completed)
- ✅ Update todo priority (low, medium, high)
- ✅ Delete todos with confirmation modal
- ✅ Users can only see their own todos

#### 5. Admin Features ✓
- ✅ View all users in table format
- ✅ Update user name and role
- ✅ Delete users with confirmation modal
- ✅ Admin dashboard inaccessible to non-admin users

#### 6. Mandatory Pages ✓
- ✅ Login page
- ✅ Signup page
- ✅ Todo Dashboard
- ✅ Profile Page
- ✅ Admin Dashboard (Admin only)

#### 7. UI Expectations ✓
- ✅ Clean, professional UI with dark charcoal and bright yellow theme
- ✅ Loading states with custom spinners
- ✅ Clear error handling with toast notifications
- ✅ Client-side form validation
- ✅ Empty states for todos and users

### Bonus Features Implemented

#### Forms & Validation ✓
- ✅ **Formik** - Form handling library
- ✅ **Yup** - Schema-based validation for all forms

#### State & Data Management ✓
- ✅ **Redux Toolkit** - Global state management
- ✅ Separate slices for auth and todos

#### Routing & Architecture ✓
- ✅ **Protected Routes** - Custom route guards
- ✅ **Admin Routes** - Role-based route protection
- ✅ **Public Routes** - Redirect authenticated users
- ✅ Clear separation of concerns (auth, users, todos)

#### UI & UX ✓
- ✅ **Reusable Components** - Button, Input, Modal, ConfirmModal, Navbar
- ✅ **Custom Confirmation Modals** - Professional delete confirmations
- ✅ **Toast Notifications** - Success and error feedback with custom styling
- ✅ **Empty States** - User-friendly messages for no data
- ✅ **Loading States** - Animated spinners with brand colors

#### Accessibility & Best Practices ✓
- ✅ Semantic HTML elements
- ✅ ARIA labels for form inputs and interactive elements
- ✅ Keyboard navigation support
- ✅ Focus states with visible indicators
- ✅ Error messages associated with form fields

---

## 🛠️ Tech Stack

### Mandatory
- **React** 18.3.1
- **TypeScript** 5.6.2
- **Tailwind CSS** 3.4.17

### Additional Libraries
- **Vite** 6.0.5 - Build tool
- **Redux Toolkit** 2.5.0 - State management
- **React Router** 7.1.3 - Routing
- **Formik** 2.4.6 - Form handling
- **Yup** 1.6.1 - Validation
- **Axios** 1.7.9 - HTTP client
- **React Toastify** 11.0.3 - Notifications

---

## 🎨 Design System

### Color Palette
- **Primary (Dark Charcoal)**
  - #2d2d2d (900)
  - #434343 (700)
  - #666666 (500)
  
- **Accent (Bright Yellow)**
  - #fbbf24 (400)
  - #f59e0b (500)
  
- **Neutral**
  - White backgrounds
  - Gray text hierarchy

### Typography
- Font: System fonts (sans-serif)
- Headings: Bold, gradient text effects
- Body: Regular weight, gray scale

### Components
- Gradient buttons with hover effects
- Form inputs with yellow focus rings
- Custom modals with backdrop blur
- Toast notifications with dark theme
- Animated loading spinners

---

## 📁 Project Structure

```
todo-frontend/
├── src/
│   ├── api/
│   │   └── axios.ts                 # Axios instance with interceptors
│   ├── assets/
│   │   └── background.jpg           # Background image
│   ├── auth/
│   │   ├── AdminRoute.tsx           # Admin route guard
│   │   ├── AuthProvider.tsx         # Auth context provider
│   │   ├── ProtectedRoute.tsx       # Protected route guard
│   │   ├── PublicRoute.tsx          # Public route guard
│   │   ├── auth.context.ts          # Auth context definition
│   │   └── useAuth.ts               # Auth custom hook
│   ├── components/
│   │   ├── Button.tsx               # Reusable button
│   │   ├── ConfirmModal.tsx         # Confirmation modal
│   │   ├── Input.tsx                # Reusable input
│   │   ├── Modal.tsx                # Generic modal
│   │   └── Navbar.tsx               # Navigation bar
│   ├── pages/
│   │   ├── AdminDashboard.tsx       # Admin dashboard
│   │   ├── Login.tsx                # Login page
│   │   ├── Profile.tsx              # User profile
│   │   ├── Signup.tsx               # Signup page
│   │   └── Todos.tsx                # Todos dashboard
│   ├── store/
│   │   ├── authSlice.ts             # Auth Redux slice
│   │   ├── store.ts                 # Redux store config
│   │   └── todosSlice.ts            # Todos Redux slice
│   ├── utils/
│   │   └── validation.ts            # Yup validation schemas
│   ├── App.tsx                      # Main app component
│   ├── index.css                    # Global styles
│   └── main.tsx                     # Entry point
├── .env                             # Environment variables
├── package.json                     # Dependencies
├── tailwind.config.js               # Tailwind configuration
├── tsconfig.json                    # TypeScript configuration
└── vite.config.ts                   # Vite configuration
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js v16 or higher
- npm or yarn

### Installation Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd todo-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=https://assignment.theregiment.in
VITE_API_KEY=305986f3--019c0364-f768-708b-bc64-9db2bee46dee
```

4. **Start development server**
```bash
npm run dev
```

5. **Access the application**
```
http://localhost:5173
```

### Admin Credentials
```
Email: adarshraut493@gmail.com
Password: qjutkwquAa1!
```

---

## 🔐 Authentication Flow

1. User enters credentials on Login/Signup page
2. API returns JWT access token and refresh token
3. Tokens stored in localStorage
4. Axios interceptor attaches access token to all requests
5. Protected routes check for valid token
6. Admin routes verify user role
7. On 401 error, user is logged out and redirected to login

---

## 📱 Features Walkthrough

### Login & Signup
- Form validation with Formik and Yup
- Real-time error messages
- Professional background with overlay
- Redirect to todos after successful login

### Todos Dashboard
- Create new todos with title and description
- View todos in paginated list (5 per page)
- Update status: Pending → In Progress → Completed
- Update priority: Low, Medium, High
- Delete with custom confirmation modal
- Empty state when no todos exist
- Loading spinner during API calls

### Profile Page
- Display user name and email
- Update name with form validation
- Email is read-only
- Success/error toast notifications

### Admin Dashboard
- Table view of all users
- Edit user name and role inline
- Delete users with confirmation
- Role badges (Admin/User)
- Empty state when no users exist

---

## 🌐 API Integration

### Base URL
```
https://assignment.theregiment.in
```

### Authentication Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user

### User Endpoints
- `GET /users/me` - Get user profile
- `PATCH /users/me` - Update profile
- `POST /users` - Get all users (Admin)
- `PATCH /users/:id` - Update user (Admin)
- `DELETE /users/:id` - Delete user (Admin)

### Todo Endpoints
- `GET /todos` - Get todos (paginated)
- `POST /todos/add` - Create todo
- `PATCH /todos/update/:id` - Update todo
- `DELETE /todos/delete/:id` - Delete todo

---

## 🧪 Testing Instructions

### Manual Testing

1. **Authentication**
   - Register new user
   - Login with credentials
   - Verify token persistence on page refresh
   - Logout and verify redirect

2. **User Features**
   - Create multiple todos
   - Update todo status and priority
   - Delete todo with confirmation
   - Navigate through pagination
   - Update profile name

3. **Admin Features**
   - Login as admin
   - View all users
   - Edit user details
   - Delete user with confirmation
   - Verify non-admin cannot access admin page

4. **Error Handling**
   - Submit forms with invalid data
   - Test network error scenarios
   - Verify toast notifications

---

## 🎯 Key Highlights

### Code Quality
- TypeScript for type safety
- Reusable components
- Custom hooks for auth
- Redux for state management
- Clean folder structure
- Consistent naming conventions

### User Experience
- Professional color scheme
- Smooth animations
- Loading states
- Error handling
- Confirmation modals
- Toast notifications
- Responsive design

### Best Practices
- Protected routes
- Role-based access control
- Form validation
- Error boundaries
- Accessibility features
- Environment variables
- API interceptors

---

## 📝 Known Limitations

1. **Soft Delete Account** - Backend API does not provide endpoint for users to delete their own account (only admin can delete users)

---

## 🔮 Future Enhancements

- Dark mode toggle
- Advanced todo filtering
- Todo search functionality
- Bulk operations
- User avatar upload
- Email verification
- Password reset flow
- Todo categories/tags
- Due dates for todos
- Todo sharing between users

---

## 📞 Contact

**Developer**: Adarsh Dilip Raut  
**Email**: adarshraut493@gmail.com  
**Assignment**: The Regiment Frontend Developer

---

## 📄 License

This project is part of an assignment for The Regiment.

---

**Last Updated**: January 29, 2025
