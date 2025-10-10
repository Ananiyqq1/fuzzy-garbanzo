import api from "@/common/axios";

export default async function getRoomSuggestions(interests:object) {
   const res= await api.get("/rooms/suggestions",interests)
    return res
}