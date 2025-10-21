<template>
  <div class="document-message">
    <span class="material-icons icon">description</span>
    <div class="info">
      <div class="username">{{ userName }}</div>
      <div class="name">{{ fileName }}</div>
      <div class="meta">{{ dateUploaded }}</div>
    </div>
    <button class="download" @click="downloadFile">
      <span class="material-icons">download</span>
    </button>
  </div>
</template>


<script>
import getDocLink from '../student/api/GetDocLink';

 
export default {
  name: 'DocumentMessage',
  props: {
    userName: { type: String, required: true },
    fileName: { type: String, required: true },
    dateUploaded: { type: String, default: 'Unknown size' },
    fileKey: { type: String, required: true }
  },
  methods: {
  async downloadFile() { 
    try{
    var link=await getDocLink(this.fileKey);
    console.log("Download link:", link);
      window.open(link, '_blank');
    }
    catch(error){
      console.error("Error downloading file:", error);
    }
  }}
}
</script> 
<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.document-message {
    display: flex;
    align-items: center;
    background: #f5f5f5;
    width: 40%;
    max-height: 700px;
    margin: 10px 18px;
    padding: 15px;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
}

.icon {
    font-size: 32px;
    color: #33374d;
    margin-right: 10px;
}

.info {
    flex-grow: 1;
}

.name {
    font-weight: bold;
    color: #333;
}

.meta {
    font-size: 12px;
    color: #777;
}

.download {
    background: none;
    border: none;
    cursor: pointer;
    color: #6a729e;
}
.username {
  font-weight: bold;
  color: #333;
  margin-bottom: 6px;
  font-size: 0.95rem;
}

</style>
