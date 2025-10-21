import api from "@/common/axios";

export default async function getDocLink(docKey: string): Promise<string> {
  var res=await api.get("/documents/" + docKey)
  if(res.status===200){
    return res.data.url.result 
  }
    return ""
}