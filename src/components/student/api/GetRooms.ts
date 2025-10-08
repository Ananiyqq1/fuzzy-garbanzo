import api from "@/common/axios";

export default async function getRooms() {
return await api.get('/api/resource/rooms')
}