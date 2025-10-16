# Frontend-Backend Integration Notes

## Overview
This document tracks the integration between the `attempt` frontend and the resource-service backend running in Docker.

## Backend Setup
- **Service**: resource-service (from HiLCoE_Peer)
- **Running Command**: `sudo docker run -p 5138:8090 dagm123/resource-service:1.3`
- **Port**: 5138 (mapped from container port 8090)
- **Base URL**: `http://localhost:5138`

## Frontend Configuration

### API Configuration
- **File**: `src/common/axios.ts`
- **Base URL**: `http://localhost:5138` (updated from 7025)
- **Credentials**: Enabled with `withCredentials: true`

### API Endpoints

#### Courses
All course endpoints updated to match backend routes (removed `/api` prefix):
- `GET /courses` - Fetch all courses
- `POST /courses` - Create a new course
- `PUT /courses/{code}` - Update a course
- `DELETE /courses/{code}` - Delete a course

#### Topics
All topic endpoints updated to match backend routes (removed `/api` prefix):
- `GET /topics` - Fetch all topics
- `POST /topics` - Create a new topic
- `PUT /topics/{id}` - Update a topic
- `DELETE /topics/{id}` - Delete a topic

## Data Models

### Course
```typescript
interface CourseResponse {
  courseCode: string
  name: string
  description: string
  creditHour: number
  category: string  // e.g., "Programming_and_SoftwareDev"
}
```

### Topic
```typescript
interface TopicResponse {
  topicId: string  // GUID
  name: string
  description: string
  courseCode: string
}
```

## Component Updates

### CourseManagement.vue
- Fixed slot syntax: `#cell-actions="{ row }"`
- Removed incorrect `defineSlots()` usage
- Properly maps category enum values to labels
- Filters by category and search term

### TopicManagement.vue
- Fixed slot syntax: `#cell-actions="{ row }"`
- Removed incorrect `defineSlots()` usage
- Maps courseCode to course name for display
- Filters by course and search term

## Known Issues

### TypeScript Linting Warnings
- **Error**: `Property 'cell-actions' does not exist on type '{}'`
- **Cause**: AppDataTable component is JavaScript, not TypeScript
- **Impact**: Cosmetic only - code runs correctly
- **Fix**: Would require converting AppDataTable to TypeScript with proper slot definitions

### SignalR Configuration
- Currently points to port 5138 (updated in `.env.example`)
- If SignalR hub is on a different service, update `VITE_SIGNALR_URL` accordingly

## Testing Checklist

1. ✅ Backend container running on port 5138
2. ✅ Frontend API calls use correct endpoints
3. ✅ Data models match backend responses
4. ✅ CORS configured correctly (if needed)
5. ⏳ Test course CRUD operations
6. ⏳ Test topic CRUD operations
7. ⏳ Verify category filtering works
8. ⏳ Verify search functionality works

## CORS Solution

The Docker resource-service container does not include CORS headers, which prevents the browser from making direct requests. 

**Solution**: Vite proxy configuration (already configured in `vite.config.ts`)

```typescript
server: {
  proxy: {
    '/courses': {
      target: 'http://localhost:5138',
      changeOrigin: true,
    },
    '/topics': {
      target: 'http://localhost:5138',
      changeOrigin: true,
    },
  },
}
```

This proxies all `/courses` and `/topics` requests through the Vite dev server, bypassing CORS restrictions.

## Category Handling

The backend returns `category` as a **number** (enum value 0-5), but the frontend displays it as a string label:

- 0 → Programming & Software Dev
- 1 → Systems & Infrastructure
- 2 → Databases & Data Mgmt
- 3 → Web & Mobile Tech
- 4 → Specialized & Emerging Areas
- 5 → IT Management & Research

The `getCategoryLabel()` function handles this conversion automatically.

## Troubleshooting

### "Failed to Load" Errors
1. Verify Docker container is running: `sudo docker ps`
2. Check container logs: `sudo docker logs [container-id]`
3. Test API directly: `curl http://localhost:5138/courses`
4. **Restart Vite dev server** after config changes
5. Check browser console for errors

### Empty Tables
1. Verify database has data
2. Check browser network tab for API response
3. Verify response structure matches TypeScript interfaces
4. Check console for JavaScript errors

## Next Steps

1. Start frontend dev server: `npm run dev` (in attempt directory)
2. Ensure Docker container is running
3. Navigate to admin pages
4. Test course and topic management features
