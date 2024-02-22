import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { ProductModel } from "../../entities/product.model";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { database } from "../../../firebase";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;
import {StorageService} from "../../api/storage.service";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private static instance: InventoryService;
  private _inventoryProducts : ProductModel[] = []
  private _inventoryMap : Map<string, ProductModel> = new Map()
  private _inventory$ = new BehaviorSubject<ProductModel[]>(this._inventoryProducts)
  private constructor(private storageService: StorageService) {
    this.loadInventoryProducts().then().catch()
  }

  public static getInstance(): InventoryService {
    if (!InventoryService.instance) {
      InventoryService.instance = new InventoryService(new StorageService());
    }
    return InventoryService.instance;
  }

  getProductsObservable$(): Observable<ProductModel[]> {
    return this._inventory$.asObservable()
  }

  async loadInventoryProducts() {
    this._inventoryProducts = []
    this._inventoryMap.clear()
    const querySnapshot = await getDocs(collection(database, "inventory"));
    querySnapshot.forEach((doc) => {
      let product = <ProductModel> doc.data();
      product.entryDate = (<Timestamp><unknown>product.entryDate).toDate();
      this._inventoryProducts.push(product)
      this._inventoryMap.set(product.IMEI, product)
    });

    this._inventory$.next(this._inventoryProducts)
  }

  /**
   * @asycn
   * @param {ProductModel} product A product model containing at least the productId property.
   * @returns {Promise<void>} Don't return anything. Add a product to database, then to the list and finally update the observable.
   * @throws {Error} If an error occurs when adding the product to the inventory.
   */
  async addProduct(product: ProductModel): Promise<ProductModel> {
    let docRef = doc(collection(database, "inventory"))
    product.productId = docRef.id
    product.urlPhoto1 = this.storageService.getPathForImage(product.productId, 1)
    product.urlPhoto2 = this.storageService.getPathForImage(product.productId, 2)
    await setDoc(docRef, product)
      .then(() => {
        this._inventoryProducts.push(product)
        this._inventoryMap.set(product.IMEI, product)
        this._inventory$.next(this._inventoryProducts)
      })
    return product;
  }

  getLength(): number {
    return this._inventoryProducts.length
  }

  getTotalPages(pageSize: number): number {
    return Math.ceil(this.getLength() / pageSize);
  }

  getProducts(pageSize: number, pageNumber: number): ProductModel[] {
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;
    return this._inventoryProducts.slice(start, end);
  }

  getProductByIMEI(imei: string): ProductModel | undefined {
    return this._inventoryMap.get(imei);
  }

}
