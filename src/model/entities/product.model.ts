import { Timestamp } from "firebase/firestore"

export interface ProductModel {
  imei : string
  model : string
  color  : string
  storage : string
  physicalState : string
  batteryState : string
  category : string
  entryDate : Date
  operator : string
  hour: Timestamp
  location : string
}
