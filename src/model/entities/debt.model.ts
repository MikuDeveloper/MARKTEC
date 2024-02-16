
export interface DebtModel {
  debtAmount:string,
  employeeId:string,
  voterKey:string,
  initialDate:Date,
  finalDate:Date,
  status:string,
  idVenta:string,
  total:string
  pays : Pays
}
export interface Pays {
  datePay:Date,
  idPago:string,
  payAmount:string,
  paymentMethod: string,
  folio?:string
  concept?:string
}
