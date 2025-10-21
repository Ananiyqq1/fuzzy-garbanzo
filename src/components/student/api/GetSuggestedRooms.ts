import api from "@/common/axios";

export default async function getRoomSuggestions(memberId: string, interests?: Array<string>) {
  let query = `memberId=${memberId}&`;
  if (interests != null) {
    for (let i = 0; i < interests.length; i++) {
      query += `courses=${interests[i]}&`;
    }
  }
  const res = await api.get(`/rooms/suggestions?${query}`);
  return res;
}