// firestore.service.ts
import { Injectable } from '@angular/core';
import { collection, getDoc,getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { database } from './firebase';
import { Objecto } from './firestore-interface';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {

// Método para obtener datos, pide como paraetro el nombre de la colección
  async getCollectionData(collectionName: string) {
    const querySnapshot = await getDocs(collection(database, collectionName));
    return querySnapshot.docs.map(doc => doc.data() as Objecto);
  }
// Método para agregar datos, pide como paraetro el nombre de la colección y la interfaz
  async addDocument(collectionName: string, data: any) {
    const docRef = await addDoc(collection(database, collectionName), data);
    return docRef.id;
  }

  async updateDocument(collectionName: string, docId: string, data: any) {
    const docRef = doc(database, collectionName, docId);
    await updateDoc(docRef, data);
  }

  async deleteDocument(collectionName: string, docId: string) {
    const docRef = doc(database, collectionName, docId);
    await deleteDoc(docRef);
  }
}
