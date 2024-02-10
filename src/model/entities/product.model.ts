export interface ProductModel {
  productId : string
  entryDate : Date
  category : string //Celular, smartwatch, tablet, consola, auriculares, otros.
  IMEI : string
  model : string
  color : string
  storageCapacity : string
  storageUnit : string
  physicalState : string //Bueno, medio, malo
  batteryState : string //Bueno, medio, malo
  comments? : string
  location : string //Bodega, local, prestado (cliente y empleado), reparación, Querétaro(empleado)
  location_customer? : string
  location_employee : string
  price? : number
  employeeId : string
  brand:string
}
