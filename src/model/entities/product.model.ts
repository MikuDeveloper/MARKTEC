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
  location : string //Bodega, local, prestado (cliente y empleado), reparación, Querétaro(empleado)
  //location_person? : string
  price? : number
  employeeId : string
}
