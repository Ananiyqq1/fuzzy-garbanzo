import { defineStore } from "pinia";
interface DocState {
    currentDocTitle: string | null;
    currentDocKey: string | null;
}
export const useDocStore = defineStore("doc", {
    state: ():DocState=> ({
        currentDocTitle:null,
        currentDocKey:null
    })
})