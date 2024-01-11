// firestore.service.ts
import { Injectable } from '@angular/core';
import { collection, setDoc,getDocs, query, updateDoc, deleteDoc, doc, where } from 'firebase/firestore';
import { Objeto } from '../entities/firestore-interface';
import { database } from '../../app/firebase';
import { CustomerModel } from '../entities/customer.model';


@Injectable({
  providedIn: 'root',
})
export class FirestoreService {

// Método para obtener datos, pide como paraetro el nombre de la colección de Employees
  async getCollectionData(collectionName: string) {
    const querySnapshot = await getDocs(collection(database, collectionName));
    return querySnapshot.docs.map(doc => doc.data() as Objeto);
  }
// Método para agregar datos, pide como paraetro el nombre de la colección y la interfaz de Employees
  async addDocument(collectionName:string,data:Objeto,id:string){
    const newDocRef = doc(database, collectionName, id)
    await setDoc( newDocRef, data)
  }
// Método para actualizar datos de un documento de la colección de Employees
  async updateDocument(collectionName: string, docId: string, data: any) {
    const docRef = doc(database, collectionName, docId)
    await updateDoc(docRef, data)
  }
//Método para eliminar un documento de la colección de Employees
  async deleteDocument(collectionName: string, docId: string) {
    const docRef = doc(database, collectionName, docId);
    await deleteDoc(docRef);
  }
//Métodos para la colección de Costumers
// Método para obtener datos, pide como paraetro el nombre de la coleccion
async getCollectionDataC(collectionName: string) {
  const querySnapshot = await getDocs(collection(database, collectionName));
  return querySnapshot.docs.map(doc => doc.data() as CustomerModel);
}
//Método para filtros
async getFilterCollection(field:string,filter:string){
  const q = query(collection(database, "customers"), where(field, "==",filter));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data() as CustomerModel);
}
// Método para agregar datos, pide como paraetro el nombre de la colección y la interfaz
async addDocumentC(collectionName:string,data:CustomerModel,id:string){
  let variableType: string = typeof id;
  console.log(variableType)
  console.log(id)
  const newDocRef = doc(database, collectionName, id)
  await setDoc( newDocRef, data)
}
// Método para actualizar datos de un documento de la colección
async updateDocumentC(collectionName: string, docId: string, data: any) {
  const docRef = doc(database, collectionName, docId)
  await updateDoc(docRef, data)
}
//Método para eliminar un documento de la colección
async deleteDocumentC(collectionName: string, docId: string) {
  const docRef = doc(database, collectionName, docId);
  await deleteDoc(docRef);
}

}
