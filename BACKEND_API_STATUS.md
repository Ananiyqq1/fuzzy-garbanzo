# 🔍 Backend API Status & Troubleshooting

**Last Checked:** 2025-10-20 14:48  
**Backend Service:** `dagm123/resource-service:1.4B` (Docker image)  
**Database:** Neon PostgreSQL

---

## ✅ Working Endpoints

| Endpoint | Method | Status | Response |
|----------|--------|--------|----------|
| `/courses` | GET | ✅ Working | Returns array of courses |
| `/topics` | GET | ✅ Working | Returns array of topics |

### **Example Working Requests:**

```bash
# Get all courses
curl http://localhost:8090/courses

# Get all topics  
curl http://localhost:8090/topics
```

---

## ❌ Broken Endpoints (Database Type Mismatch)

### **Problem:** Backend code expects GUID/UUID but database has TEXT columns

| Endpoint | Method | Status | Error |
|----------|--------|--------|-------|
| `/rooms` | GET | ❌ Error | `Reading as 'System.Guid' is not supported for fields having DataTypeName 'text'` |
| `/rooms/suggestions` | GET | ❌ Error | `operator does not exist: text = uuid` |
| `/documents` | GET | ❌ Empty | Returns empty array (likely type mismatch) |
| `/documents/suggestions` | GET | ❌ Error | `Reading as 'System.Guid' is not supported for fields having DataTypeName 'text'` |
| `/api/resource/rooms` | GET | ❌ Empty | Returns empty array |

### **Example Error Responses:**

```bash
# Rooms endpoint
curl http://localhost:8090/rooms
# Returns: Reading as 'System.Guid' is not supported for fields having DataTypeName 'text'

# Room suggestions
curl "http://localhost:8090/rooms/suggestions?memberId=3fa85f64-5717-4562-b3fc-2c963f66afa6&courses=CS101"
# Returns: operator does not exist: text = uuid

# Documents
curl http://localhost:8090/documents
# Returns: [] (empty)

# Document suggestions
curl "http://localhost:8090/documents/suggestions?courses=CS101"
# Returns: Reading as 'System.Guid' is not supported for fields having DataTypeName 'text'
```

---

## 🔧 Root Cause Analysis

### **Database Schema Issue**

The backend C# code is trying to read database columns as GUIDs/UUIDs, but the PostgreSQL database columns are defined as TEXT.

**Example Error:**
```
42883: operator does not exist: text = uuid
POSITION: 374
```

This happens when the backend tries to compare a TEXT column with a UUID parameter.

**Solution Options:**

1. **Fix Database Schema** (Recommended):
   ```sql
   ALTER TABLE rooms ALTER COLUMN room_id TYPE uuid USING room_id::uuid;
   ALTER TABLE documents ALTER COLUMN doc_id TYPE uuid USING doc_id::uuid;
   ```

2. **Fix Backend Code**:
   Change C# models to use `string` instead of `Guid` for IDs

3. **Use Alternative Endpoints**:
   Use endpoints that work (like `/courses`, `/topics`)

---

## 🎯 Current Frontend Solution

The Student Dashboard has been updated to **gracefully handle API failures**:

### **Error Handling Strategy:**

```typescript
// Try to fetch rooms
try {
  const roomsResponse = await getRoomSuggestions(userId, interests);
  if (roomsResponse.status === 200 && roomsResponse.data) {
    fetchedRooms.value = roomsResponse.data.map(mapToStudentRoom);
  }
} catch (roomError) {
  console.warn('⚠️ Failed to fetch rooms from backend');
  // Gracefully fallback to empty state
  fetchedRooms.value = [];
}
```

### **User Experience:**

- ✅ Page loads without crashing
- ✅ Shows empty state messages
- ✅ Console warnings instead of errors
- ✅ Working endpoints still functional

---

## 🧪 Test Backend Endpoints

### **Quick Test Script:**

```bash
# Test all endpoints
echo "Testing /courses..."
curl -s http://localhost:8090/courses | jq -r '.[] | .courseCode' | head -5

echo "\nTesting /topics..."
curl -s http://localhost:8090/topics | jq -r '.[] | .name' | head -5

echo "\nTesting /rooms..."
curl -s http://localhost:8090/rooms

echo "\nTesting /documents..."
curl -s http://localhost:8090/documents

echo "\nTesting /rooms/suggestions..."
curl -s "http://localhost:8090/rooms/suggestions?memberId=3fa85f64-5717-4562-b3fc-2c963f66afa6&courses=CS101"

echo "\nTesting /documents/suggestions..."
curl -s "http://localhost:8090/documents/suggestions?courses=CS101"
```

---

## 📊 Backend Services Status

### **Check Services:**

```bash
cd /home/nemo/Workspace_Peer/HiLCoE_Peer
sudo docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

### **Expected Output:**

```
NAMES              STATUS                    PORTS
resource_service   Up X minutes              0.0.0.0:8090->8090/tcp, 0.0.0.0:7027->7027/tcp
rabbitmq           Up X minutes (healthy)    0.0.0.0:5672->5672/tcp, 0.0.0.0:15672->15672/tcp
minio              Up X minutes              0.0.0.0:7000->9000/tcp, 0.0.0.0:7001->9001/tcp
```

### **Check Backend Logs:**

```bash
# See recent logs
sudo docker logs resource_service --tail 50

# Follow logs in real-time
sudo docker logs -f resource_service
```

---

## 🔌 Service URLs

| Service | URL | Username | Password |
|---------|-----|----------|----------|
| **API** | http://localhost:8090 | - | - |
| **SignalR Hub** | http://localhost:7027/roomHub | - | - |
| **RabbitMQ UI** | http://localhost:15672 | guest | guest |
| **MinIO UI** | http://localhost:7001 | username | password |

---

## 🐛 Common Issues & Solutions

### **Issue 1: "Network Error" in Frontend**

**Symptoms:**
- Console shows CORS errors
- API calls fail with status 0
- "Network Error" messages

**Solutions:**
1. Check backend is running: `sudo docker ps`
2. Verify `.env` file has correct URLs
3. Check browser console for specific error
4. Restart backend: `sudo docker-compose restart resource_service`

### **Issue 2: Empty Data on Dashboard**

**Symptoms:**
- Dashboard loads but shows "No rooms available"
- "No documents available" messages
- Console shows warnings

**Solutions:**
1. Check console for specific API errors
2. Test endpoints manually with curl (see above)
3. Verify backend database has data
4. Check for GUID/UUID type errors in logs

### **Issue 3: "Reading as 'System.Guid' is not supported"**

**Symptoms:**
- API returns error instead of data
- Database type mismatch error

**Solutions:**
1. **Backend needs database schema fix** (requires backend team)
2. Use working endpoints only (`/courses`, `/topics`)
3. Frontend gracefully handles the error (already implemented)

### **Issue 4: SignalR Connection Failed**

**Symptoms:**
- Console warning: "SignalR connection failed"
- Real-time features don't work

**Solutions:**
1. Check SignalR service is running on port 7027
2. Verify `.env` has: `VITE_SIGNALR_URL=http://localhost:7027/roomHub`
3. Check firewall/network settings
4. Dashboard still works (SignalR is non-critical for display)

---

## 💡 Recommendations

### **For Full Functionality:**

1. **Contact backend team** to fix database schema:
   - Convert TEXT columns to UUID type
   - Or change backend code to use strings

2. **Alternative: Use working endpoints**:
   - Build features using `/courses` and `/topics`
   - Wait for rooms/documents fix

3. **Current State: Frontend is resilient**:
   - Handles API failures gracefully
   - Shows empty states with messages
   - Doesn't crash on errors
   - Working endpoints still functional

---

## 📝 Frontend Changes Made

### **Updated Files:**

1. **StudentDashboard.vue** - Added comprehensive error handling:
   - Try-catch blocks for each API call
   - Graceful fallback to empty arrays
   - Console logging for debugging
   - Non-blocking SignalR connection

2. **API Files** - All using correct endpoint patterns:
   - GetCourses.ts → ✅ Works
   - GetTopics.ts → ✅ Works  
   - GetRooms.ts → ❌ Backend issue
   - GetDocs.ts → ❌ Backend issue
   - GetSuggestedRooms.ts → ❌ Backend issue
   - GetSuggestedDocs.ts → ❌ Backend issue

---

## ✅ What Works Now

Even with backend issues, the app still:

- ✅ Loads without crashing
- ✅ Shows proper empty states
- ✅ Has working course management (admin)
- ✅ Has working topic management (admin)
- ✅ Provides clear error messages in console
- ✅ Degrades gracefully

---

## 🎯 Next Steps

### **Option A: Wait for Backend Fix**
- Backend team fixes database schema
- All endpoints will work
- Full functionality restored

### **Option B: Build with Working Endpoints**
- Use `/courses` and `/topics` for now
- Build course/topic-based features
- Rooms/docs features wait for fix

### **Option C: Mock Data Fallback**
- Add fallback mock data when APIs fail
- Full UI functionality
- Replace with real data when fixed

---

**Status:** ⚠️ **Partial - Backend database issues**  
**Frontend:** ✅ **Handles errors gracefully**  
**Action Required:** 🔧 **Backend database schema fix needed**

---

*Last Updated: 2025-10-20 14:48*
