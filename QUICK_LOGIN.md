# Quick Login Reference

## Start the App
```bash
cd /home/nemo/Workspace_Peer/attempt
npm run dev
```

Visit: http://localhost:5173/auth

---

## Admin Login
```
Email: admin@hilcoe.edu.et
Password: admin123
```
**Access**: Course Management, Topic Management, Analytics, User Management

---

## Student Logins

### John Doe
```
Email: john.doe@hilcoe.edu.et
Password: student123
```

### Jane Smith
```
Email: jane.smith@hilcoe.edu.et
Password: student123
```

### Alex Johnson
```
Email: alex.johnson@hilcoe.edu.et
Password: student123
```

**Access**: Dashboard, Sessions, Resources, Study Rooms, Evaluations

---

## Features Available

### Admin (/admin routes)
- ✅ Create/Edit/Delete Courses
- ✅ Create/Edit/Delete Topics  
- ✅ Filter and search
- ✅ Data persists in localStorage
- ✅ 14 pre-loaded courses
- ✅ 20 pre-loaded topics

### Student (/ routes)
- ✅ Dashboard
- ✅ View resources
- ✅ Study rooms
- ✅ Sessions (mock data)
- ✅ Profile

---

## Testing Course Management

1. Login as admin
2. Go to http://localhost:5173/admin/courses
3. Create a new course
4. Edit existing course
5. Delete a course
6. Use filters and search
7. Refresh page - data persists!

---

## Testing Topic Management

1. Go to http://localhost:5173/admin/topics
2. Select a course from dropdown
3. Create a new topic
4. Edit existing topic
5. Delete a topic
6. Filter by course

---

## Reset Data

Open browser console (F12) and run:
```javascript
localStorage.clear()
location.reload()
```

---

## Mode: 100% Standalone
- ✅ No backend required
- ✅ No Docker needed
- ✅ No API calls
- ✅ All data in localStorage
- ✅ Works offline

See `STANDALONE_MODE.md` for full documentation.
