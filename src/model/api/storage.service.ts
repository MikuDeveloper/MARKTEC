import { Injectable } from '@angular/core';
import { ref, uploadString, deleteObject, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async uploadImage(dataUrl : string, path: string) {
    const storageRef = ref(storage, path)
    await uploadString(storageRef, dataUrl, 'data_url')
  }

  async deleteFile(pathFile : string) {
    await deleteObject(ref(storage, pathFile))
  }

  getPathForImage(productId : string, imageNumber: number) {
    return `pictures/${productId}/${imageNumber}_${uuidv4()}`
  }

  getUrlFromPath(gsUrl: string) {
    return getDownloadURL(ref(storage, `${gsUrl}`))
  }
}
