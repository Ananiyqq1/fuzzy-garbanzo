import api from "@/common/axios";

export default async function getCourses() {
  return await api.get("/courses")
}
