# 🚀 Quick Start Guide - Student Features with Backend Integration

## ✅ What Was Done

### **4 New API Files Created**
```
src/components/student/api/
├── GetCourses.ts          → GET /courses
├── GetDocs.ts             → GET /documents?category={cat}
├── GetSuggestedDocs.ts    → GET /documents/suggestions
└── JoinRoom.ts            → POST /rooms/members
```

### **3 Files Updated**
```
src/
├── common/useSignalR.ts              (JS → TypeScript)
├── types/student.ts                  (added mappers)
└── components/student/StudentDashboard.vue (backend integration)
```

---

## 🎯 Key Features Now Working

### ✅ **Study Rooms**
- Real-time room suggestions from backend
- "Join Room" button navigates via SignalR
- Shows course codes and topics
- Member count displayed

### ✅ **Recommended Documents**
- Backend-powered recommendations
- "Download" button opens documents
- Date formatting
- Empty states

### ✅ **SignalR Real-time**
- TypeScript type safety
- Auto-reconnect
- Room join/leave
- Message broadcasting

---

## 🏃 How to Run

### **1. Start Backend**
```bash
cd /home/nemo/Workspace_Peer/HiLCoE_Peer
sudo docker-compose up -d
```

### **2. Verify Backend**
```bash
# Check services
sudo docker ps

# Test API
curl http://localhost:8090/courses
```

### **3. Start Frontend**
```bash
cd /home/nemo/Workspace_Peer/attempt
npm run dev
```

### **4. Access App**
Open: http://localhost:5173

---

## 🧪 Quick Test

1. **Dashboard loads** → See study rooms & documents
2. **Click "Join Room"** → Navigate to room page
3. **Click "Download"** → Document opens in new tab
4. **Check console** → No errors

---

## 📊 Backend URLs

| Service | URL | Purpose |
|---------|-----|---------|
| API | http://localhost:8090 | REST endpoints |
| SignalR | http://localhost:7027/roomHub | Real-time chat |
| RabbitMQ | http://localhost:15672 | Message queue UI |
| MinIO | http://localhost:7001 | Object storage UI |

---

## 🐛 Troubleshooting

### **No rooms showing?**
```bash
# Check backend logs
sudo docker logs resource_service --tail 50

# Test API directly
curl http://localhost:8090/rooms/suggestions?memberId=test&courses=CS101
```

### **Network errors?**
Check `.env` file:
```bash
cat /home/nemo/Workspace_Peer/attempt/.env
# Should show:
# VITE_API_BASE_URL=http://localhost:8090
# VITE_SIGNALR_URL=http://localhost:7027/roomHub
```

### **TypeScript errors?**
```bash
# Restart TypeScript server in IDE
# OR
cd /home/nemo/Workspace_Peer/attempt
npm run build
```

---

## 📝 What's Next?

### **TODO - Replace Hardcoded IDs**
Currently using: `3fa85f64-5717-4562-b3fc-2c963f66afa6`

Replace with:
```typescript
import { useAuthStore } from '@/stores/useAuthStore';
const auth = useAuthStore();
const userId = auth.user?.id;
```

### **TODO - Add More Student Features**
- Resources page with full CRUD
- Study rooms page with filtering
- Real-time chat in rooms
- Document upload with progress

---

## 📚 Documentation

- **Full Migration Details:** `STUDENT_FEATURES_MIGRATION.md`
- **Project Comparison:** `PROJECT_COMPARISON_ANALYSIS.md`
- **CSS Documentation:** `CSS_STRATEGIES.md`
- **Course CRUD Fix:** `COURSE_CRUD_FIX.md`

---

**Status:** ✅ Ready to use  
**Last Updated:** 2025-10-20
