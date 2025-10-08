import api from "@/common/axios";

export default async function fetchPosts(roomId:string,page:number,size:number){
return await api.get(`/posts?roomId=${roomId}&pageNumber=${page}&pageSize=${size}`,)
}