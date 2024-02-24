
export interface DebtModel {
  debtId?:string, //guardará el id del doc
  debtAmount:string,
  employeeId:string,
  voterKey:string,
  initialDate:Date,
  finalDate:Date,
  status:string,
  idVenta:string,
  total:string,
  pays : Pays []
}
export interface Pays {
  datePay:Date,
  payAmount:string,
  paymentMethod: string,
  folio?:string,
  concept?:string
}
