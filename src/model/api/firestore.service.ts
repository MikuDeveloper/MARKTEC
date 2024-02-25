// firestore.service.ts
import { Injectable } from '@angular/core';
import { collection, setDoc,getDocs, query, updateDoc, deleteDoc, doc, where, addDoc, getDoc, arrayUnion} from 'firebase/firestore';
import { Objeto } from '../entities/firestore-interface';
import { database } from '../../firebase';
import { CustomerModel } from '../entities/customer.model';
import { ProductModel } from '../entities/product.model';
import { SaleModel } from '../entities/sale.model';
import { DebtModel, Pays } from '../entities/debt.model';


@Injectable({
  providedIn: 'root',
})
export class FirestoreService {

// Método para obtener datos, pide como paraetro el nombre de la colección de Employees
  async getCollectionData(collectionName: string) {
    const querySnapshot = await getDocs(collection(database, collectionName));
    return querySnapshot.docs.map(doc => doc.data() as Objeto )
  }
  async getCollectionDataTest(collectionName: string) {
    const querySnapshot = await getDocs(collection(database, collectionName));
    return querySnapshot.docs.map(doc =>  doc.data() as ProductModel)
}

    /*
    const temporaryPassword = this.generateTemporaryPassword();
    data.password = temporaryPassword;

    const newDocRef = doc(collection(database, collectionName));
    data.id = newDocRef.id
    await setDoc(newDocRef,data);
    return temporaryPassword;
    */
// Método para agregar datos, pide como paraetro el nombre de la colección y la interfaz de Employees
  async addDocument(collectionName:string,data:Objeto,id:string){
    const newDocRef = doc(database, collectionName, id)
    await setDoc( newDocRef, data)

    const temporaryPassword = this.generateTemporaryPassword();
    return temporaryPassword;
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

  generateTemporaryPassword() {
    let length = 6;
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let retVal = "";
    for (let i = 0; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return retVal;
   }
  //Métodos para la colección de Costumers
  // Método para obtener datos, pide como parametro el nombre de la coleccion Customer
  async getCollectionDataC(collectionName: string) {
    const querySnapshot = await getDocs(collection(database, collectionName));
    return querySnapshot.docs.map(doc => doc.data() as CustomerModel);
  }
  //Método para filtros de componente Customer
  async getFilterCollection(field:string,filter:string){
    const q = query(collection(database, "customers"), where(field, "==",filter));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as CustomerModel);
  }
  // Método para buscador de datos
  async searchData(search: string | null){
    const q = query(collection(database, "customers"), where("voterKey", "==",search));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as CustomerModel)
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
    console.log(collectionName,docId,data)
    const docRef = doc(database, collectionName, docId)
    await updateDoc(docRef, data)
  }
  //Método para eliminar un documento de la colección
  async deleteDocumentC(collectionName: string, docId: string) {
    const docRef = doc(database, collectionName, docId);
    await deleteDoc(docRef);
  }
  //Método para extraer el id de un docuemnto conociendo el valor de un campo específico
  async getDocIdByField(collectionName: string, field: string, value: any) {
    const querySnapshot = await getDocs(query(collection(database, collectionName), where(field, '==', value)));
    return querySnapshot.docs[0].id;
}
  // Método para actualizar un elemento de la colección inventory
  async updateInventory(collectionName: string, docId: string, data: any) {
    //console.log(collectionName,docId,data)
    const docRef = doc(database, collectionName, docId)
    await updateDoc(docRef, data)
  }
  // Método para agregar elementos a la coleccion exchanges
  async addExchange(collectionName:string,data:ProductModel){
    await addDoc(collection(database,collectionName),data)
  }
  // Método para agregar un documento a sales
  async addSale(collectionName:string,data:SaleModel){
    const docRef = await addDoc(collection(database,collectionName) ,data)
    return docRef.id
  }
  async updateSale(collectionName: string, docId: string, data: any) {
    //console.log(collectionName,docId,data)
    const docRef = doc(database, collectionName, docId)
    await updateDoc(docRef, data)
  }
  async addDebt(collectionName:string,data:DebtModel){
    const docRef = await addDoc(collection(database,collectionName) ,data)
    return docRef.id
  }
  //Método para extraer la colección de deudas
  async getCollectionDebt(collectionName:string){
    const querySnapshot = await getDocs(collection(database, collectionName))
    return querySnapshot.docs.map(doc => doc.data() as DebtModel)
  }
  //Método para obtener una deuda especifica
   //Método para extraer el id de un docuemnto conociendo el valor de un campo específico
   async getDebt(docId:string) {
    const docRef = doc(database,'debts', docId)
    const querySnapshot = await getDoc(docRef)
    return querySnapshot.data() as DebtModel
}
//Agrega un nuevo abono al arreglo de Pays
  async addPay(id:string,data:Pays){
    const debtRef = doc(database, "debts", id);
    await updateDoc(debtRef, {
      pays: arrayUnion(data)
      });
  }
}
