export interface ProductModel {
  entryDate : Date
  category : string
  IMEI : string
  model : string
  color : string
  storage : string
  physicalState : string
  batteryState : string
  comments? : string
  location : string
  price? : number
  employeeId? : string
}
