#!/bin/bash

# Test Script for Student Pages Backend Integration
# Run this to verify all APIs are working

echo "🧪 Testing Student Pages Backend Integration"
echo "=============================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Base URL
BASE_URL="http://localhost:8090"

# Test 1: Get all rooms
echo "📋 Test 1: GET /rooms"
response=$(curl -s -w "\n%{http_code}" "$BASE_URL/rooms")
status_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$status_code" = "200" ]; then
    room_count=$(echo "$body" | jq '. | length' 2>/dev/null || echo "0")
    echo -e "${GREEN}✅ SUCCESS${NC} - Status: $status_code"
    echo "   Rooms found: $room_count"
else
    echo -e "${RED}❌ FAILED${NC} - Status: $status_code"
fi
echo ""

# Test 2: Get room suggestions
echo "📋 Test 2: GET /rooms/suggestions"
response=$(curl -s -w "\n%{http_code}" "$BASE_URL/rooms/suggestions?memberId=3fa85f64-5717-4562-b3fc-2c963f66afa6&courses=Programming")
status_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$status_code" = "200" ]; then
    room_count=$(echo "$body" | jq '. | length' 2>/dev/null || echo "0")
    echo -e "${GREEN}✅ SUCCESS${NC} - Status: $status_code"
    echo "   Suggested rooms: $room_count"
else
    echo -e "${RED}❌ FAILED${NC} - Status: $status_code"
fi
echo ""

# Test 3: Get all documents
echo "📋 Test 3: GET /documents"
response=$(curl -s -w "\n%{http_code}" "$BASE_URL/documents")
status_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$status_code" = "200" ]; then
    doc_count=$(echo "$body" | jq '. | length' 2>/dev/null || echo "0")
    echo -e "${GREEN}✅ SUCCESS${NC} - Status: $status_code"
    echo "   Documents found: $doc_count"
else
    echo -e "${RED}❌ FAILED${NC} - Status: $status_code"
fi
echo ""

# Test 4: Get document suggestions
echo "📋 Test 4: GET /documents/suggestions"
response=$(curl -s -w "\n%{http_code}" "$BASE_URL/documents/suggestions?courses=Programming&courses=Databases")
status_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$status_code" = "200" ]; then
    doc_count=$(echo "$body" | jq '. | length' 2>/dev/null || echo "0")
    echo -e "${GREEN}✅ SUCCESS${NC} - Status: $status_code"
    echo "   Suggested documents: $doc_count"
else
    echo -e "${RED}❌ FAILED${NC} - Status: $status_code"
fi
echo ""

# Test 5: Get courses
echo "📋 Test 5: GET /courses"
response=$(curl -s -w "\n%{http_code}" "$BASE_URL/courses")
status_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$status_code" = "200" ]; then
    course_count=$(echo "$body" | jq '. | length' 2>/dev/null || echo "0")
    echo -e "${GREEN}✅ SUCCESS${NC} - Status: $status_code"
    echo "   Courses found: $course_count"
else
    echo -e "${RED}❌ FAILED${NC} - Status: $status_code"
fi
echo ""

# Test 6: Get topics
echo "📋 Test 6: GET /topics"
response=$(curl -s -w "\n%{http_code}" "$BASE_URL/topics")
status_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$status_code" = "200" ]; then
    topic_count=$(echo "$body" | jq '. | length' 2>/dev/null || echo "0")
    echo -e "${GREEN}✅ SUCCESS${NC} - Status: $status_code"
    echo "   Topics found: $topic_count"
else
    echo -e "${RED}❌ FAILED${NC} - Status: $status_code"
fi
echo ""

echo "=============================================="
echo "🎉 Testing Complete!"
echo ""
echo "Next steps:"
echo "1. Start frontend: cd /home/nemo/Workspace_Peer/attempt && npm run dev"
echo "2. Open browser: http://localhost:5173"
echo "3. Check console (F12) for API logs"
echo "4. Test navigation: Dashboard → Study Rooms → Resources"
