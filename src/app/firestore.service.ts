// firestore.service.ts
import { Injectable } from '@angular/core';
import { collection, setDoc,getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { database } from './firebase';
import { Objeto } from './firestore-interface';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {

// Método para obtener datos, pide como paraetro el nombre de la colección
  async getCollectionData(collectionName: string) {
    const querySnapshot = await getDocs(collection(database, collectionName));
    return querySnapshot.docs.map(doc => doc.data() as Objeto);
  }
// Método para agregar datos, pide como paraetro el nombre de la colección y la interfaz
  async addDocument(collectionName: string, data: Objeto) {
    const newDocRef = doc(collection(database, collectionName));
    data.id = newDocRef.id
    await setDoc(newDocRef,data);
    return ;
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
