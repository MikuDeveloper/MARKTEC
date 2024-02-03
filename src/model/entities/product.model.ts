/**
 * @property {string} productId ID for product.
 * @property {Date} entryDate Date and hour the product was registered.
 */
export interface ProductModel {
  productId : string
  entryDate : Date
  category : string //Celular, smartwatch, tablet, consola, auriculares, otros.
  brand : string
  IMEI : string
  model : string
  color : string
  storageCapacity? : number | string
  storageUnit? : string
  physicalState : number //1 - 10
  batteryState? : number | string //%
  comments? : string
  location : string //Bodega, local, prestado (cliente y empleado), reparación, Querétaro(empleado), VENDIDO (EXCLUSIVO DE VENTA)
  location_employee? : string
  location_customer? : string
  price? : number
  employeeId : string
}
