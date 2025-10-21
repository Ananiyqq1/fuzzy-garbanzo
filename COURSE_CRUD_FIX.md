# ✅ Course CRUD 400 Error - FIXED!

## 🐛 Problem

**Error:** "Request failed with status code 400" when adding or editing courses

**Root Cause:** The frontend was sending `Category` as a **string** (`"0"`, `"1"`, `"2"`), but the backend expects an **integer** (`0`, `1`, `2`).

---

## 🔧 What Was Fixed

### **File 1: `/src/services/adminCourses.ts`**

**Changed:**
```typescript
export interface CoursePayload {
  CourseCode: string
  Name: string
  Description: string
  CreditHour: number
  Category: string  // ❌ WRONG - was sending string
}
```

**To:**
```typescript
export interface CoursePayload {
  CourseCode: string
  Name: string
  Description: string
  CreditHour: number
  Category: number  // ✅ CORRECT - now sends integer
}
```

### **File 2: `/src/stores/useCoursesStore.ts`**

**Changed (line 103):**
```typescript
Category: this.mapCategoryToNumber(course.category).toString(),  // ❌ Converting to string
```

**To:**
```typescript
Category: this.mapCategoryToNumber(course.category),  // ✅ Keeping as number
```

**Changed (line 142):**
```typescript
Category: this.mapCategoryToNumber(updatedCourse.category).toString(),  // ❌ Converting to string
```

**To:**
```typescript
Category: this.mapCategoryToNumber(updatedCourse.category),  // ✅ Keeping as number
```

---

## 📊 Category Enum Values

The backend expects these **integer** values:

| Category | Integer Value |
|----------|--------------|
| Programming | `0` |
| Databases | `1` |
| Systems | `2` |
| Web & Mobile | `3` |
| ICT & Research | `4` |
| Specialized | `5` |

---

## ✅ Verification

**API Test (Successful):**
```bash
curl -X POST http://localhost:8090/courses \
  -H "Content-Type: application/json" \
  -d '{
    "CourseCode": "TEST888",
    "Name": "Test Course",
    "Description": "Test description",
    "CreditHour": 4,
    "Category": 1
  }'

# Response: 200 OK ✅
```

---

## 🧪 How to Test

### **1. Refresh the Frontend**

Since the TypeScript files were updated, **refresh the page** or the dev server should hot-reload:

```bash
# If hot reload doesn't work, restart manually:
cd /home/nemo/Workspace_Peer/attempt
# Kill old process if needed: pkill -f "vite"
npm run dev
```

### **2. Try Creating a Course**

1. Go to: http://localhost:5173/admin/courses
2. Click **"Create Course"** button
3. Fill in the form:
   - Course Code: `TEST101`
   - Name: `Test Course`
   - Credit Hour: `3`
   - Category: Select any category
   - Description: `Test description`
4. Click **Submit**

**Expected Result:** ✅ Course created successfully (no 400 error)

### **3. Try Editing a Course**

1. Click **Edit** button on any existing course
2. Modify the name or category
3. Click **Update**

**Expected Result:** ✅ Course updated successfully (no 400 error)

---

## 🎯 What Changed in Behavior

### **Before (Broken):**
```javascript
// Frontend sent:
{
  "Category": "0"  // ❌ String
}

// Backend expected:
{
  "Category": 0  // ✅ Integer
}

// Result: 400 Bad Request ❌
```

### **After (Fixed):**
```javascript
// Frontend now sends:
{
  "Category": 0  // ✅ Integer
}

// Backend receives:
{
  "Category": 0  // ✅ Integer
}

// Result: 200 OK ✅
```

---

## 🔍 How the Mapping Works

### **Frontend Display Format:**
- Uses **lowercase strings** with hyphens
- Example: `"programming"`, `"web-&-mobile"`, `"ict-&-research"`

### **Backend Storage Format:**
- Uses **integer enum** values
- Example: `0`, `1`, `2`, `3`, `4`, `5`

### **Conversion Functions (in useCoursesStore.ts):**

**String → Number (for API requests):**
```typescript
mapCategoryToNumber(category: string): number {
  const normalized = category.toLowerCase().replace(/-/g, ' ')
  for (const [key, value] of Object.entries(categoryReverseMap)) {
    if (key.toLowerCase().replace(/\s+&\s+/g, ' ') === normalized) {
      return value  // Returns 0, 1, 2, etc.
    }
  }
  return 0  // Default to Programming
}
```

**Number → String (for display):**
```typescript
mapCategoryToString(category: number): string {
  const mapped = categoryMap[category] || 'programming'
  return mapped.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')
}
```

---

## 🚨 Common Pitfalls

### **❌ DON'T:**
```typescript
Category: String(categoryNumber)  // Converts to string
Category: categoryNumber.toString()  // Converts to string
Category: `${categoryNumber}`  // Converts to string
```

### **✅ DO:**
```typescript
Category: categoryNumber  // Keep as number
Category: parseInt(categoryString)  // Convert string to number if needed
```

---

## 📝 Summary

**Fixed Files:**
1. ✅ `/src/services/adminCourses.ts` - Changed `Category: string` to `Category: number`
2. ✅ `/src/stores/useCoursesStore.ts` - Removed `.toString()` from Category field (2 places)

**What Works Now:**
- ✅ Create new courses
- ✅ Edit existing courses
- ✅ No more 400 errors
- ✅ Category enum properly sent as integer

**Testing:**
- ✅ API test successful
- ✅ Test courses cleaned up
- ✅ Ready for frontend testing

---

## 🎉 Status

**Problem:** Request failed with status code 400  
**Status:** ✅ **FIXED**  
**Action Required:** Refresh browser and test course creation/editing

---

**Last Updated:** 2025-10-18 23:46  
**Files Modified:** 2  
**Lines Changed:** 3
