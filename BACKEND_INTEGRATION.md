# Backend Integration Guide

## Overview
This document describes the integration between the frontend and the backend resource service running on `http://localhost:5138`.

## Configuration

### Environment Variables
Created `.env` file with:
```env
VITE_API_BASE_URL=http://localhost:5138
VITE_SIGNALR_URL=http://localhost:5138/roomHub
```

## Integrated Endpoints

### Courses API

#### Frontend Store: `src/stores/useCoursesStore.ts`
- **Fetch All Courses**: `GET /courses`
  - Maps backend category numbers (0-5) to frontend strings
  - Categories: Programming, Databases, Systems, Web & Mobile, ICT & Research, Specialized

- **Create Course**: `POST /courses`
  - Payload format: `{ CourseCode, Name, Description, CreditHour, Category }`
  - Category sent as string number (e.g., "0" for Programming)

- **Update Course**: `PUT /courses/{courseCode}`
  - Same payload format as create
  - Updates existing course by code

- **Delete Course**: `DELETE /courses/{courseCode}`
  - Removes course from backend and local state

#### Category Mapping
```typescript
Backend (number) → Frontend (string)
0 → 'programming'
1 → 'databases'
2 → 'systems'
3 → 'web-mobile'
4 → 'ict-research'
5 → 'specialized'
```

### Topics API

#### Frontend Store: `src/stores/useTopicsStore.ts`
- **Fetch All Topics**: `GET /topics`
  - Returns all topics with their associated course codes

- **Create Topic**: `POST /topics`
  - Payload format: `{ CourseCode, Name, Description }`
  - Backend generates unique `topicId`

- **Update Topic**: `PUT /topics/{topicId}`
  - Updates topic by ID
  - Can change course association

- **Delete Topic**: `DELETE /topics/{topicId}`
  - Removes topic from backend and local state

## Usage in Components

### Admin Course Management (`src/components/admin/CourseManagement.vue`)
```typescript
// Component automatically uses the integrated store
import { useCoursesStore } from '@/stores/useCoursesStore'

const coursesStore = useCoursesStore()

// Fetch courses from backend
await coursesStore.fetchCourses()

// Create new course
await coursesStore.createCourse({
  courseCode: 'CS101',
  name: 'Introduction to Programming',
  description: '...',
  creditHour: 3,
  category: 'programming'
})
```

### Admin Topic Management (`src/components/admin/TopicManagement.vue`)
```typescript
import { useTopicsStore } from '@/stores/useTopicsStore'

const topicsStore = useTopicsStore()

// Fetch topics from backend
await topicsStore.fetchTopics()

// Create new topic
await topicsStore.createTopic({
  courseCode: 'CS101',
  name: 'Variables and Data Types',
  description: '...'
})
```

## Data Flow

### Courses
1. **Admin creates/updates course** → Frontend validation
2. **Frontend store** → Transform category to backend format
3. **API call** → Backend resource service
4. **Backend response** → Transform category to frontend format
5. **Update local state** → UI automatically updates

### Topics
1. **Admin creates/updates topic** → Frontend validation
2. **Frontend store** → Direct API call (no transformation needed)
3. **API call** → Backend resource service
4. **Backend response** → Update local state
5. **UI automatically updates** → Reactive Vue components

## Error Handling

### Store Level
- All API errors are caught and stored in `error` state
- Error messages include backend response messages when available
- Loading states tracked with `isLoading` flag

### Component Level
- Components display error messages to users
- Failed operations don't break the UI
- Users can retry failed operations

## Testing the Integration

### 1. Start Backend Service
```bash
sudo docker run -d -p 5138:8090 --name resource-service dagm123/resource-service:1.3
```

### 2. Start Frontend
```bash
cd /home/nemo/Workspace_Peer/attempt
npm run dev
```

### 3. Test Scenarios

#### Test Course Management
1. Navigate to Admin → Courses
2. Page should fetch and display existing courses from backend
3. Create a new course:
   - Fill in all required fields
   - Select a category
   - Click "Create Course"
   - New course should appear in the table immediately
4. Edit a course:
   - Click edit button
   - Modify fields
   - Click "Update Course"
   - Changes should reflect immediately
5. Delete a course:
   - Click delete button
   - Confirm deletion
   - Course should be removed from table

#### Test Topic Management
1. Navigate to Admin → Topics
2. Page should fetch and display existing topics from backend
3. Filter by course to see course-specific topics
4. Create a new topic:
   - Select a course
   - Enter topic name and description
   - Click "Create Topic"
   - New topic should appear in the list
5. Edit and delete topics similarly

### 4. Verify Backend Updates
```bash
# Check backend logs
sudo docker logs resource-service

# Should see API requests:
# GET /courses
# POST /courses
# PUT /courses/{code}
# DELETE /courses/{code}
# GET /topics
# POST /topics
# etc.
```

## Migration Notes

### Previous Implementation
- Used localStorage for persistence
- Mock data from `src/data/mockCourses.ts` and `src/data/mockTopics.ts`
- No real backend integration

### Current Implementation
- ✅ Real API integration with backend service
- ✅ Data persists in backend database
- ✅ Category mapping between backend and frontend formats
- ✅ Error handling from backend responses
- ✅ Loading states during API calls
- ✅ Optimistic UI updates after successful operations

### Mock Data Files
- `src/data/mockCourses.ts` - Still used for TypeScript types
- `src/data/mockTopics.ts` - Still used for TypeScript types
- These files now only provide type definitions, not data

## Next Steps

### Recommended Integrations
1. **Authentication**: Integrate auth endpoints for user login
2. **Student Study Rooms**: Connect to room management APIs
3. **Resources**: Integrate document upload and retrieval
4. **Sessions**: Connect session management endpoints
5. **Evaluations**: Integrate evaluation submission APIs

### Performance Optimizations
1. Implement caching strategies
2. Add pagination for large datasets
3. Debounce search/filter operations
4. Add optimistic updates for better UX

### Error Handling Improvements
1. Add retry logic for failed requests
2. Implement toast notifications
3. Add request timeout handling
4. Better error message mapping

## Troubleshooting

### Common Issues

#### 1. CORS Errors
**Problem**: Browser blocks requests to backend
**Solution**: Backend must have CORS enabled for `http://localhost:5173`

#### 2. Port Already in Use
**Problem**: Port 5138 is occupied
**Solution**: 
```bash
sudo docker stop resource-service
sudo docker rm resource-service
# Then restart
```

#### 3. Category Not Displaying Correctly
**Problem**: Backend returns number but frontend expects string
**Solution**: Already handled by `mapCategoryToString()` and `mapCategoryToNumber()` methods

#### 4. Network Errors
**Problem**: Cannot reach backend
**Solution**: 
- Verify Docker container is running: `sudo docker ps`
- Check backend logs: `sudo docker logs resource-service`
- Verify API base URL in `.env`

## API Documentation

### Backend Endpoints Used

#### Courses
- `GET /courses` - List all courses
- `POST /courses` - Create new course
- `PUT /courses/{courseCode}` - Update course
- `DELETE /courses/{courseCode}` - Delete course

#### Topics
- `GET /topics` - List all topics
- `POST /topics` - Create new topic
- `PUT /topics/{topicId}` - Update topic
- `DELETE /topics/{topicId}` - Delete topic

### Request/Response Examples

#### Create Course
```json
// Request: POST /courses
{
  "CourseCode": "CS101",
  "Name": "Introduction to Programming",
  "Description": "Learn the basics of programming",
  "CreditHour": 3,
  "Category": "0"
}

// Response: 200 OK
{
  "courseCode": "CS101",
  "name": "Introduction to Programming",
  "description": "Learn the basics of programming",
  "creditHour": 3,
  "category": 0
}
```

#### Create Topic
```json
// Request: POST /topics
{
  "CourseCode": "CS101",
  "Name": "Variables and Data Types",
  "Description": "Understanding variables and basic data types"
}

// Response: 200 OK
{
  "topicId": "5f91f492-ecdf-4e6b-bdc5-119b379db123",
  "courseCode": "CS101",
  "name": "Variables and Data Types",
  "description": "Understanding variables and basic data types"
}
```

## Conclusion

The integration is complete for Courses and Topics management. The system now persists data to the backend database and provides a seamless experience for admin users to manage course content.
