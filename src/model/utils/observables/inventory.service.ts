import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { ProductModel } from "../../entities/product.model";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { database } from "../../../firebase";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private _inventoryProducts : ProductModel[] = []
  private _inventory$ = new BehaviorSubject<ProductModel[]>(this._inventoryProducts)
  constructor() { }

  getProductsObservable$(): Observable<ProductModel[]> {
    return this._inventory$.asObservable()
  }

  async loadInventoryProducts() {
    this._inventoryProducts = []
    const querySnapshot = await getDocs(collection(database, "inventory"));
    querySnapshot.forEach((doc) => {
      this._inventoryProducts.push(<ProductModel> doc.data())
    });

    this._inventory$.next(this._inventoryProducts)
  }

  /**
   * @asycn
   * @param {ProductModel} product A product model containing at least the productId property.
   * @returns {Promise<void>} Don't return anything. Add a product to database, then to the list and finally update the observable.
   * @throws {Error} If an error occurs when adding the product to the inventory.
   */
  async addProduct(product: ProductModel): Promise<void> {
    let docRef = doc(collection(database, "inventory"))
    product.productId = docRef.id
    await setDoc(docRef, product)
      .then(() => {
        this._inventoryProducts.push(product)
        this._inventory$.next(this._inventoryProducts)
      })
  }

}
