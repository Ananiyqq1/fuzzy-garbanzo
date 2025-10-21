import api from "@/common/axios";

export default async function loadRooms(explore: boolean, userId: string) {
  return await api.get(`/rooms?explore=${explore}&memberId=${userId}`)
}