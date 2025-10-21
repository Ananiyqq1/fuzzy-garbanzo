# Standalone Mode Documentation

## Overview

The Vue application is now configured to run **completely standalone** without any backend integration. All data is stored locally in the browser using **localStorage** and managed via **Pinia stores**.

---

## Features

### ✅ Mock Authentication
- Login with predefined users (no real API calls)
- User data persisted in localStorage
- Role-based access (Admin/Student)

### ✅ Local Data Management
- All courses and topics stored in localStorage
- Full CRUD operations work offline
- Data persists across browser sessions

### ✅ No Backend Required
- Zero API dependencies
- No docker containers needed
- No network requests

---

## Quick Start

### 1. Install Dependencies
```bash
cd /home/nemo/Workspace_Peer/attempt
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Access the Application
- Open: http://localhost:5173
- Login page will appear

---

## Mock Users & Credentials

### Admin User
- **Email**: `admin@hilcoe.edu.et`
- **Password**: `admin123`
- **Role**: Admin
- **Access**: `/admin` routes (courses, topics, users, analytics)

### Student Users

**User 1 - John Doe**
- **Email**: `john.doe@hilcoe.edu.et`
- **Password**: `student123`
- **Role**: Student (peer)
- **Access**: `/` routes (dashboard, sessions, resources, study rooms)

**User 2 - Jane Smith**
- **Email**: `jane.smith@hilcoe.edu.et`
- **Password**: `student123`
- **Role**: Student (peer)

**User 3 - Alex Johnson**
- **Email**: `alex.johnson@hilcoe.edu.et`
- **Password**: `student123`
- **Role**: Student (peer)

---

## Application Routes

### Public Routes
- `/auth` - Login/Register page

### Admin Routes (requires admin role)
- `/admin` - Admin dashboard
- `/admin/courses` - Course management (CRUD)
- `/admin/topics` - Topic management (CRUD)
- `/admin/users` - User management
- `/admin/analytics` - Analytics dashboard
- `/admin/insights` - System insights
- `/admin/settings` - Settings
- `/admin/profile` - Admin profile

### Student Routes (requires peer role)
- `/` - Student dashboard
- `/sessions` - My sessions
- `/resources` - Learning resources
- `/study-rooms` - Study rooms
- `/room/:id` - Individual study room
- `/evaluations` - Evaluations
- `/profile` - Student profile

---

## Data Structure

### Mock Data Files

**Courses** (`src/data/mockCourses.ts`)
- 14 pre-populated courses
- Categories: Programming, Systems, Databases, Web/Mobile, Specialized, Management
- Stored in localStorage key: `hilcoe_courses`

**Topics** (`src/data/mockTopics.ts`)
- 20 pre-populated topics
- Linked to courses via `courseCode`
- Stored in localStorage key: `hilcoe_topics`

**Users** (`src/data/mockUsers.ts`)
- 4 predefined users (1 admin, 3 students)
- Stored in localStorage key: `hilcoe_demo_current_user` (current user only)

### Pinia Stores

**Auth Store** (`src/stores/useAuthStore.ts`)
- Handles login/logout
- Stores current user in localStorage
- Mock authentication with predefined credentials

**Courses Store** (`src/stores/useCoursesStore.ts`)
- CRUD operations for courses
- Loads from/saves to localStorage
- Simulates API delays (200-300ms)

**Topics Store** (`src/stores/useTopicsStore.ts`)
- CRUD operations for topics
- Loads from/saves to localStorage
- Simulates API delays (200-300ms)

---

## How It Works

### Authentication Flow

```
1. User enters email/password on /auth
2. Auth store checks against mockCredentials
3. If match found, load user from mockUsers
4. Store user in localStorage
5. Redirect to /admin (admin) or / (student)
```

### Course/Topic Management Flow

```
1. Component calls Pinia store action (e.g., fetchCourses())
2. Store loads data from localStorage
3. If no data, use default mock data
4. Display data in component
5. On CRUD operation, update store
6. Store saves to localStorage
7. Data persists across sessions
```

### Data Persistence

All data is saved to browser localStorage:
- `hilcoe_demo_current_user` - Current logged-in user
- `hilcoe_courses` - All courses
- `hilcoe_topics` - All topics

**To reset data**: Clear localStorage in browser DevTools or logout.

---

## Testing the Application

### Test Course Management (Admin)

1. Login as admin (`admin@hilcoe.edu.et` / `admin123`)
2. Navigate to `/admin/courses`
3. **Create**: Fill form and click "Create Course"
4. **Read**: View courses in table
5. **Update**: Click edit icon, modify, save
6. **Delete**: Click delete icon
7. **Filter**: Use category dropdown and search
8. Refresh page - data persists!

### Test Topic Management (Admin)

1. Navigate to `/admin/topics`
2. Select a course from dropdown
3. **Create**: Fill form and click "Create Topic"
4. **Read**: View topics in table
5. **Update**: Click edit icon, modify, save
6. **Delete**: Click delete icon
7. **Filter**: Use course filter and search

### Test Student Features

1. Logout and login as student
2. Navigate to `/resources`
3. View learning resources
4. Navigate to `/study-rooms`
5. View available study rooms
6. All data is mock but interactive

---

## Key Changes from Backend Integration

### Before (Backend Mode)
```typescript
// Services made API calls
import { fetchCourses } from '@/services/adminCourses'
const courses = await fetchCourses() // HTTP request
```

### Now (Standalone Mode)
```typescript
// Stores use localStorage
import { useCoursesStore } from '@/stores/useCoursesStore'
const store = useCoursesStore()
const courses = store.allCourses // From localStorage
```

### Components Updated
- `CourseManagement.vue` - Uses `useCoursesStore`
- `TopicManagement.vue` - Uses `useTopicsStore`
- `SignIn.vue` - Uses `auth.login()` with mock credentials

### Auth Store Updated
- `fetchUser()` - Loads from localStorage, no API call
- `login()` - Validates against mockCredentials
- `register()` - Stores to localStorage

---

## Development Workflow

### Adding New Courses

**Option 1**: Via UI (Recommended)
1. Login as admin
2. Go to `/admin/courses`
3. Fill form and create

**Option 2**: Edit `src/data/mockCourses.ts`
```typescript
export const mockCourses: Course[] = [
  // Add your course here
  {
    courseCode: 'CS500',
    name: 'Advanced Topics',
    creditHour: 4,
    description: 'Description here',
    category: 0, // 0-5
  },
  // ... existing courses
]
```
Then clear localStorage and reload.

### Adding New Topics

**Option 1**: Via UI
1. Login as admin
2. Go to `/admin/topics`
3. Fill form and create

**Option 2**: Edit `src/data/mockTopics.ts`
```typescript
export const mockTopics: Topic[] = [
  // Add your topic here
  {
    topicId: 'unique-guid-here',
    name: 'New Topic',
    description: 'Description',
    courseCode: 'CS500', // Must match a course
  },
  // ... existing topics
]
```

### Adding New Mock Users

Edit `src/data/mockUsers.ts`:
```typescript
export const mockUsers: CurrentUser[] = [
  {
    user_id: 'student-004',
    username: 'new.student',
    name: 'New Student',
    institute_email: 'new.student@hilcoe.edu.et',
    email: 'new.student@example.com',
    overall_score: 70,
    profile_photo: '',
    online_status: true,
    bio: 'Bio here',
    roles: ['peer'], // or ['admin']
    interests: ['AI', 'Web Dev'],
    created_at: '2024-05-01T00:00:00Z',
  },
  // ... existing users
]

export const mockCredentials = [
  { email: 'new.student@hilcoe.edu.et', password: 'student123' },
  // ... existing credentials
]
```

---

## Troubleshooting

### Issue: Data Disappeared
**Solution**: Data is stored in localStorage. If cleared, it resets to default mock data.

### Issue: Login Not Working
**Solution**: 
- Check email/password matches one in `mockCredentials`
- Open DevTools console for error messages
- Default admin: `admin@hilcoe.edu.et` / `admin123`

### Issue: Changes Not Persisting
**Solution**: 
- Check browser console for localStorage errors
- Ensure localStorage is enabled (not in private browsing)
- Check if quota exceeded (unlikely with this data size)

### Issue: "Loading..." Spinner Forever
**Solution**: 
- Check browser console for errors
- Stores simulate API delays - should complete in <1s
- If stuck, refresh page

### Issue: Can't Create Course/Topic
**Solution**: 
- Ensure all required fields filled
- Course code must be unique
- Check error message displayed below form

---

## Resetting to Default Data

### Method 1: Clear localStorage (Recommended)
```javascript
// Open browser console (F12)
localStorage.clear()
// Reload page
location.reload()
```

### Method 2: Use Store Methods
```javascript
// In browser console
import { useCoursesStore } from '@/stores/useCoursesStore'
import { useTopicsStore } from '@/stores/useTopicsStore'

const courses = useCoursesStore()
const topics = useTopicsStore()

courses.resetToDefaults()
topics.resetToDefaults()
```

### Method 3: Logout
- Logout clears user data only, not courses/topics

---

## File Structure Reference

```
src/
├── data/                      # Mock data
│   ├── mockCourses.ts        # 14 courses
│   ├── mockTopics.ts         # 20 topics
│   ├── mockUsers.ts          # 4 users + credentials
│   ├── studentResources.ts   # Student resources
│   ├── studentSessions.ts    # Student sessions
│   └── studentRooms.ts       # Study rooms
│
├── stores/                    # Pinia stores
│   ├── useAuthStore.ts       # Authentication
│   ├── useCoursesStore.ts    # Course CRUD
│   └── useTopicsStore.ts     # Topic CRUD
│
├── components/
│   ├── admin/
│   │   ├── CourseManagement.vue  # ✅ Uses store
│   │   └── TopicManagement.vue   # ✅ Uses store
│   └── auth/
│       └── SignIn.vue            # ✅ Uses mock login
│
└── services/                  # ⚠️ Not used in standalone mode
    ├── adminCourses.ts        # (Keep for future backend integration)
    └── adminTopics.ts         # (Keep for future backend integration)
```

---

## Future: Re-enabling Backend Integration

When backend is ready, you'll need to:

1. **Update Admin Components**
   - Replace store calls with service calls
   - `useCoursesStore()` → `import { fetchCourses } from '@/services/adminCourses'`

2. **Update Auth Store**
   - Uncomment API calls in `fetchUser()`
   - Update `login()` to call backend API

3. **Configure Environment**
   - Set `VITE_API_BASE_URL` in `.env.local`
   - Update `vite.config.ts` proxy

4. **Remove Mock Data Usage**
   - Keep files for reference
   - Switch imports in components

---

## Benefits of Standalone Mode

✅ **No Backend Required** - Work on frontend without backend running  
✅ **Fast Development** - No API delays, instant feedback  
✅ **Offline Capable** - Works without internet  
✅ **Easy Testing** - Predictable data, no database setup  
✅ **Simple Demo** - Show features without backend complexity  
✅ **Data Persistence** - Changes saved across sessions  

---

## Limitations

❌ **No Real Authentication** - Anyone with credentials can login  
❌ **No Multi-User Sync** - Data is per-browser, not shared  
❌ **No Server Validation** - All validation is client-side  
❌ **Limited by localStorage** - ~5-10MB storage limit  
❌ **No Real-Time Features** - SignalR/WebSockets won't work  

---

## Summary

The application is now **100% standalone** and ready for frontend development and testing. All features work without a backend:

- ✅ Login/Logout
- ✅ Course CRUD
- ✅ Topic CRUD  
- ✅ Data persistence
- ✅ Role-based routing
- ✅ All student pages (with mock data)

When backend is ready, integration will be straightforward by switching from Pinia stores back to API services.

---

**Last Updated**: 2025-10-17  
**Mode**: Standalone (No Backend)
