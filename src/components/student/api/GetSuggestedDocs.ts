import api from "@/common/axios";

export default async function getDocSuggestions(interests: Array<string>) {
  const query = interests.map(interest => `courses=${interest}`).join('&')
  return await api.get(`/documents/suggestions?${query}`)
}
