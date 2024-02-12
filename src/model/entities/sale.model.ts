export interface Payment {
  productPrice: string;
  subtotal: string;
  initialPay: string;
  paymentMethod: string;
  total: string;
}

export interface Exchanges {
  idOne?: string;
  idTwo?: string;
  idThree?: string;
}

export interface SaleModel {
  saleId: string;
  payment: Payment;
  exchanges?: Exchanges;
  productId: string;
  voterKey: string;
  employeeId: string;
  saleDate: Date;
  debtId?: string;
  status: string;
}
