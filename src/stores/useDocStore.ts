import { defineStore } from "pinia";

interface DocState {
    currentDocTitle: string | null;
    currentDocKey: string | null;
    currentDocId: string | null;
    currentDocDownloadUrl: string | null;
}

interface UploadedDocumentPayload {
    docId: string;
    docKey: string;
    docTitle: string;
    downloadUrl?: string | null;
}

export const useDocStore = defineStore("doc", {
    state: ():DocState=> ({
        currentDocTitle:null,
        currentDocKey:null,
        currentDocId:null,
        currentDocDownloadUrl:null
    }),
    actions: {
        setUploadedDocument(payload: UploadedDocumentPayload) {
            this.currentDocId = payload.docId;
            this.currentDocKey = payload.docKey;
            this.currentDocTitle = payload.docTitle;
            this.currentDocDownloadUrl = payload.downloadUrl ?? null;
        },
        clearUploadedDocument() {
            this.currentDocId = null;
            this.currentDocKey = null;
            this.currentDocTitle = null;
            this.currentDocDownloadUrl = null;
        }
    }
})

export type DocStore = ReturnType<typeof useDocStore>;