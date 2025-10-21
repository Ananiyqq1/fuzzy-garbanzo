import api from "@/common/axios";

export default async function joinRoom(body: object) {
  return await api.post("/rooms/members", body)
}
