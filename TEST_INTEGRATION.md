# 🧪 Test Student Pages Integration

## Quick Test Guide

### **Start Services:**

```bash
# Terminal 1: Backend (if not running)
cd /home/nemo/Workspace_Peer/HiLCoE_Peer
sudo docker-compose up -d

# Terminal 2: Frontend
cd /home/nemo/Workspace_Peer/attempt
npm run dev
```

---

## Test Each Page

### **1. Dashboard** ✅
**URL:** http://localhost:5173

**What to test:**
- [ ] Rooms section shows suggestions
- [ ] Documents section shows recommendations
- [ ] "Join Room" button works
- [ ] "Download" button works
- [ ] Console shows: `✅ Loaded X rooms/documents`

**Expected Console Output:**
```
Connected to SignalR
✅ Loaded 3 rooms from backend
✅ Loaded 5 documents from backend
```

---

### **2. Study Rooms** ✅
**URL:** http://localhost:5173/study-rooms

**What to test:**
- [ ] "Joined Rooms" section appears
- [ ] "Explore Other Rooms" section appears
- [ ] "Open Chat" button (for joined rooms)
- [ ] "Join Chat" button (for explorable rooms)
- [ ] Console shows both room lists

**Expected Console Output:**
```
Connected to SignalR
✅ Loaded 2 joined rooms
✅ Loaded 23 rooms to explore
```

---

### **3. Resources** ✅
**URL:** http://localhost:5173/resources

**What to test:**
- [ ] Documents list appears
- [ ] Category tabs work
- [ ] Clicking category reloads documents
- [ ] "Download" button works
- [ ] Console shows filtered results

**Expected Console Output:**
```
✅ Loaded 17 documents
# Click Programming tab:
✅ Filtered to 5 documents
# Click Databases tab:
✅ Filtered to 3 documents
```

---

## Verify Backend Integration

### **Check API Calls:**

Open browser DevTools (F12) → Network tab:

**Dashboard should call:**
- `GET /rooms/suggestions?memberId=...&courses=...`
- `GET /documents/suggestions?courses=...`

**StudyRooms should call:**
- `GET /rooms?explore=false&memberId=...`
- `GET /rooms?explore=true&memberId=...`

**Resources should call:**
- `GET /documents?category=-1` (on load)
- `GET /documents?category=0` (when clicking Programming)
- `GET /documents?category=2` (when clicking Databases)

---

## Test Actions

### **Join Room:**
1. Click "Join Room" on Dashboard
2. Should navigate to `/room/{id}`
3. Check console for "Joined room" message

### **Download Document:**
1. Click "Download" button
2. New tab should open with document
3. Check console for "Downloading: {title}"

### **Category Filtering:**
1. Go to Resources page
2. Click different category tabs
3. Watch Network tab - should see new API call each time
4. Documents list should update

---

## Troubleshooting

### **No data showing:**
```bash
# Check backend
curl http://localhost:8090/rooms
curl http://localhost:8090/documents

# Should return JSON data
```

### **Network errors:**
- Check `.env` file has correct URLs
- Verify backend is running: `sudo docker ps`
- Check browser console for specific errors

### **TypeScript errors:**
```bash
# Rebuild project
cd /home/nemo/Workspace_Peer/attempt
npm run build
```

---

## Success Criteria

✅ All three pages load without errors  
✅ Real data from backend displays  
✅ Console shows successful API calls  
✅ Actions (Join, Download) work  
✅ Category filtering works  
✅ Navigation works  

---

**Last Updated:** 2025-10-20 18:29
