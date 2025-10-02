import api from "@/common/axios";

export async function signUp(body:object) {
return await api.post('/auth/signup',body)
}