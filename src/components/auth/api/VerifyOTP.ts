import api from "@/common/axios";

export async function verify_otp(params:any) {
  return await api.post("/auth/otp/verify?with_cookie=true",params)  
}