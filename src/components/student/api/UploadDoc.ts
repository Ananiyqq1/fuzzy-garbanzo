import api from "@/common/axios";

export async function uploadDocument(formData: object,file:File) {
    try{
  const response = await api.post('/documents/', formData
    );

const uploadResponse = await api.put(response.data.uploadUrl, file)
return uploadResponse
    }
    catch(error){
console.log("Error encountered while uploading document",error)
    }
    } 
 