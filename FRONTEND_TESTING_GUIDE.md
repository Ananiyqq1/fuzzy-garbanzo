# 🧪 Frontend Testing Guide - Backend Integration

**Status:** ✅ Backend has data, frontend configured with logging  
**Date:** 2025-10-20 19:00

---

## 🎯 What I've Done

1. ✅ **Confirmed backend has data** (25 rooms, 17 documents)
2. ✅ **Verified .env is configured** correctly
3. ✅ **Added comprehensive console logging** to all pages
4. ✅ **Created API test page** for direct testing
5. ✅ **Enhanced error handling** with detailed logging

---

## 🚀 Step-by-Step Testing

### **Step 1: Start the Frontend**

```bash
cd /home/nemo/Workspace_Peer/attempt
npm run dev
```

**Expected output:**
```
VITE v5.x.x ready in XXX ms
➜ Local: http://localhost:5173/
```

---

### **Step 2: Test API Connection (Direct Test)**

**Open this URL first:**
```
http://localhost:5173/test-api
```

This loads a special test page that will:
- Test all API endpoints
- Show response status codes
- Display actual data returned
- Show any errors clearly

**What to do:**
1. Click "🚀 Test All Endpoints" button
2. Watch the results populate
3. Check if all show green success messages
4. Look at the sample data displayed

**If all tests pass ✅:**
- Your API connection works perfectly
- The issue is in the component rendering

**If tests fail ❌:**
- Note which endpoint fails
- Check the error message
- We'll fix the specific issue

---

### **Step 3: Test Dashboard Page**

**Open:**
```
http://localhost:5173/
```

**Immediately press F12** to open DevTools and go to Console tab.

**What you should see in Console:**
```
📊 Dashboard: Starting data load...
⚠️ Dashboard: SignalR failed (non-critical): [error] ← This is OK!
🔄 Dashboard: Fetching room suggestions...
📥 Dashboard: Rooms response: {status: 200, data: [...]}
✅ Dashboard: Loaded 2 rooms
🔄 Dashboard: Fetching document suggestions...
📥 Dashboard: Docs response: {status: 200, data: [...]}
✅ Dashboard: Loaded 3 documents
✅ Dashboard: Data load complete!
```

**What to check:**
- [ ] Do you see "📊 Dashboard: Starting data load..."?
- [ ] Do you see "✅ Dashboard: Loaded X rooms"?
- [ ] Do you see "✅ Dashboard: Loaded Y documents"?
- [ ] Are the numbers > 0?

**If you see ❌ errors:**
- Copy the full error message
- Note which step failed (rooms or documents)
- Check Network tab for failed requests

---

### **Step 4: Test Study Rooms Page**

**Open:**
```
http://localhost:5173/study-rooms
```

**Console should show:**
```
🏫 StudyRooms: Starting data load...
✅ StudyRooms: SignalR connected (or warning if failed)
🔄 StudyRooms: Fetching joined rooms...
📥 StudyRooms: Joined rooms response: {status: 200, data: [...]}
✅ StudyRooms: Loaded 16 joined rooms
🔄 StudyRooms: Fetching explorable rooms...
📥 StudyRooms: Explore rooms response: {status: 200, data: [...]}
✅ StudyRooms: Loaded 9 rooms to explore
✅ StudyRooms: Data load complete!
```

**What to check:**
- [ ] "Joined Rooms" section shows rooms
- [ ] "Explore Other Rooms" section shows rooms
- [ ] Room cards display properly
- [ ] Console shows successful data load

---

### **Step 5: Test Resources Page**

**Open:**
```
http://localhost:5173/resources
```

**Console should show:**
```
📚 Resources: Starting data load...
🔄 Resources: Fetching documents (category: -1 )...
📥 Resources: Documents response: {status: 200, data: [...]}
✅ Resources: Loaded 17 documents
```

**Try clicking category tabs:**
```
🔄 Resources: Category changed to: 0
📥 Resources: Filtered documents response: {status: 200, data: [...]}
✅ Resources: Filtered to 5 documents
```

**What to check:**
- [ ] Documents display on page load
- [ ] Category tabs work
- [ ] Clicking tabs reloads documents
- [ ] Console shows filtered results

---

## 🔍 Debugging Decision Tree

### **Scenario 1: Nothing renders, no console logs**

**Problem:** JavaScript error preventing execution

**Solution:**
1. Check Console tab for RED errors
2. Look for "Cannot find module" or syntax errors
3. Run: `npm install && npm run build`

---

### **Scenario 2: Console logs appear, but data count is 0**

**Problem:** API calls succeeding but returning empty arrays

**Check Console for:**
```
📥 Dashboard: Rooms response: {status: 200, data: []}  ← Empty!
```

**Solution:**
1. Go to Network tab
2. Find the API request
3. Click on it
4. Check "Response" tab
5. Is it actually empty or is there data?

**If Response has data:**
- The mapper might be broken
- Check `mapToRoom` and `mapToResource` functions

**If Response is empty:**
- Backend might be filtering too aggressively
- Try the `/test-api` page to verify

---

### **Scenario 3: Network errors (CORS, 404, etc.)**

**Console shows:**
```
❌ Dashboard: Failed to load data: [error]
```

**Check Network tab for:**
- **404 Not Found** → Check API endpoint path
- **CORS error** → Backend CORS issue (unlikely since it worked with curl)
- **500 Server Error** → Backend crash, check docker logs

**Solutions:**

**For 404:**
```bash
# Verify API is accessible
curl http://localhost:8090/courses
```

**For CORS:**
```bash
# Check if backend is running
sudo docker ps | grep resource_service

# Restart if needed
cd /home/nemo/Workspace_Peer/HiLCoE_Peer
sudo docker-compose restart resource_service
```

**For 500:**
```bash
# Check backend logs
sudo docker logs resource_service --tail 50
```

---

### **Scenario 4: Data loads but doesn't display**

**Console shows:**
```
✅ Dashboard: Loaded 3 rooms
✅ Dashboard: Loaded 5 documents
```

**But nothing on screen!**

**Problem:** Template rendering issue

**Check:**
1. Open Vue DevTools (if installed)
2. Look at component data
3. Verify `fetchedRooms.length` and `bookRecommendations.length`

**Quick diagnostic - Add to template:**
```vue
<div style="position: fixed; top: 0; right: 0; background: red; color: white; padding: 1rem; z-index: 9999;">
  Rooms: {{ fetchedRooms.length }} | Docs: {{ bookRecommendations.length }}
</div>
```

If you see numbers but no cards:
- CSS issue
- Check browser zoom level
- Try different browser

---

## 📊 Expected Results Summary

### **Dashboard:**
- Rooms section: 2-3 suggestion cards
- Documents section: 2-5 document cards
- Console: ✅ success messages

### **Study Rooms:**
- Joined Rooms: 10-16 room cards
- Explore Rooms: 5-15 room cards
- Console: ✅ success messages for both sections

### **Resources:**
- Initial load: 17 document cards
- After filtering: 3-8 cards (depends on category)
- Console: ✅ success messages with counts

---

## 🛠️ Quick Fixes

### **Fix 1: Restart Everything**
```bash
# Backend
cd /home/nemo/Workspace_Peer/HiLCoE_Peer
sudo docker-compose restart

# Frontend (Ctrl+C then)
cd /home/nemo/Workspace_Peer/attempt
npm run dev
```

### **Fix 2: Clear Browser Cache**
- Ctrl+Shift+Delete
- Clear "Cached images and files"
- Refresh with Ctrl+F5

### **Fix 3: Rebuild Frontend**
```bash
cd /home/nemo/Workspace_Peer/attempt
rm -rf node_modules/.vite
npm run build
npm run dev
```

---

## 📝 What To Report

If something doesn't work, tell me:

1. **Which page** (Dashboard, Study Rooms, Resources, or Test API)
2. **Console output** (copy the entire console log)
3. **Network tab** (status codes of API calls)
4. **What you see on screen** (blank? error message? partial data?)
5. **Any RED errors** in console

---

## ✅ Success Checklist

After testing, you should have:

- [ ] Test API page shows all green ✅
- [ ] Dashboard shows room and document cards
- [ ] Study Rooms shows two sections with cards
- [ ] Resources shows document cards
- [ ] Category filtering works on Resources
- [ ] Console shows ✅ success messages
- [ ] No ❌ errors in console
- [ ] Network tab shows 200 OK for all requests

---

## 🎯 Next Steps

**If everything works:**
- The integration is complete! ✅
- Data flows from backend to frontend
- All pages are functional

**If something doesn't work:**
- Follow the debugging decision tree above
- Report what you found using the "What To Report" guide
- We'll fix the specific issue together

---

**The backend is ready. The frontend is configured. Now let's verify it works!**

Open http://localhost:5173/test-api and let me know what happens! 🚀
