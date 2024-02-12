import { Component, ViewChild } from '@angular/core';
import { NavService } from "../../model/utils/navbar.util";
import { CustomerModel } from '../../model/entities/customer.model';
import { FirestoreService } from '../../model/api/firestore.service';
import { CommonModule } from '@angular/common';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead.module';
import { Observable, OperatorFunction, Subject, debounceTime, distinctUntilChanged, filter, map, merge, timestamp } from 'rxjs';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductModel } from '../../model/entities/product.model';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../model/utils/session.service';
import { User } from 'firebase/auth';
import { Exchanges, Payment, SaleModel } from '../../model/entities/sale.model';
@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [FormsModule,CommonModule,NgbTypeaheadModule],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent {
  customers : CustomerModel = {
    voterKey : '',
    name : '',
    address : '',
    phoneNumber : '',
    email : '',
    facebook : '',
    status:'',
    debt: 0
  }
  originalCustomers:CustomerModel[] =[] // arreglo para almacenar los customers y filtrarlos
  customer:CustomerModel[] =[] // arreglo para mostrar el customer filtrado o el customer creado
  showCard : boolean = false // variable para mostrar u ocultar tarjeta de datos de customer
  showBtn : boolean = true // variable para mostrar u ocultar boton para nuevo customer
  originalItem : ProductModel [] = [] // arreglo para alamacenar los Productos
  item : ProductModel [] = [] //arreglo para mostrar el producto escogido
  items : ProductModel = {
    productId: '',
    entryDate: new Date,
    category: '',
    IMEI: '',
    model: '',
    color: '',
    storageCapacity: '',
    storageUnit: '',
    physicalState: 0,
    batteryState: '',
    location: '',
    location_employee: '',
    employeeId: '',
    brand: '',
    urlPhoto1: '',
    urlPhoto2: ''
  }
  itemId : string = ''
  model : string = ''

  @ViewChild('instance', { static: true })
  instance!: NgbTypeahead;
  @ViewChild('instanceItem', { static: true })
  instanceItem!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  focusItem$ = new Subject<string>();
  clickItem$ = new Subject<string>();
  showCardItem: boolean = false; //variable para mostrar o no la tarjeta de artículo de venta
  showBtnItem: boolean = true; //variable para mostrar o no la boton de artículo de venta
  modelItem: string = ''
  exchangeCard: ProductModel [] = []
  exchange : ProductModel = {
    productId: '',
    entryDate: new Date,
    category: '',
    IMEI: '',
    model: '',
    color: '',
    storageCapacity: '',
    storageUnit: '',
    physicalState: 0,
    batteryState: '',
    location: '',
    location_employee: '',
    employeeId: '',
    brand: '',
    urlPhoto1: '',
    urlPhoto2: ''
  }
  infoExchange : ProductModel = {
    productId: '',
    entryDate: new Date,
    category: '',
    IMEI: '',
    model: '',
    color: '',
    storageCapacity: '',
    storageUnit: '',
    physicalState: 0,
    batteryState: '',
    location: '',
    location_employee: '',
    employeeId: '',
    brand: '',
    urlPhoto1: '',
    urlPhoto2: ''
  }
  showBtnExch : boolean = true
  date : Date =  new Date()
  user : string | undefined | null
  initialPay : string =''
  paymentMethod : string = ''
  subtotal : string = ''
  sale: SaleModel = {
    saleId: 'sale1',
    payment: {
      productPrice: '',
      subtotal: '',
      initialPay: '',
      paymentMethod: '',
      total: '',
    },
    exchanges: {
      idOne: '',
      idTwo: '',
      idThree: '',
    },
    productId: '',
    voterKey: '',
    employeeId: '',
    saleDate: new Date(),
    debtId: '',
    status: '',
  }
  paymentModel: Payment ={
    productPrice: ''+this.items.price,
    subtotal: ''+this.subtotal,
    initialPay: this.initialPay,
    paymentMethod: this.paymentMethod='',
    total: String (this.getTotalPrice())
  }


  constructor(private navService: NavService,
    private databaseService: FirestoreService,
    private sessionService:SessionService) {
    this.navService.toggleNav(true);
  }
  async ngOnInit(){
    // Aquí, estás obteniendo datos de la colección "customers" de tu base de datos.
    // La función getCollectionDataC() es una función asíncrona, por lo que utilizas 'await' para esperar a que se resuelva antes de continuar.
    this.originalCustomers = await this.databaseService.getCollectionDataC("customers");
    // Estás haciendo una copia de los datos originales de los clientes para poder manipularlos sin alterar los datos originales.
    this.customer = [...this.originalCustomers]
    this.originalItem = await this.databaseService.getCollectionDataTest("inventory")
    this.originalItem = this.originalItem.filter(item => item.location != 'vendido')
    this.item = [...this.originalItem]
    console.log(this.item)
    console.log(this.customer)
  }

  // Método para búsqueda de Customers ya existentes
  search:  OperatorFunction<string, readonly string[]> = (text$: Observable<string>)=> {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$
    //Mapeo de respuesta  apartir de un filtrado por propiedades name y voterKey
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) => (term === '' ? this.customer : this.customer.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
      v.voterKey.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)),
      map(customers => customers.map(customer => `${customer.name} - ${customer.voterKey}`)) // <-- Agrega esta línea
    );
  };
  //Método para que con un parámetro de tipo event$ pueda manipular la selección que haga el ususario de un Customer
  onSelect(event: NgbTypeaheadSelectItemEvent) {
    const selectedValue = event.item; // Esto será algo como "Nombre - ClaveDeVotante"
    const [name, voterKey] = selectedValue.split(' - ') // Separa el nombre y la clave de votante
    // Busca el cliente seleccionado en tu arreglo de clientes
    const selectedCustomer = this.customer.find(customer => customer.name === name && customer.voterKey === voterKey);

    if (selectedCustomer) {
      // Aquí puedes hacer lo que quieras con el cliente seleccionado
      console.log(selectedCustomer)
      this.customers = selectedCustomer
      this.showCard = true
      this.showBtn = false
    }
  }

  // Método para búsqueda de un Artículo de Venta
  searchItem:  OperatorFunction<string, readonly string[]> = (text$: Observable<string>)=> {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickItem$.pipe(filter(() => !this.instanceItem.isPopupOpen()));
    const inputFocus$ = this.focusItem$
    //Mapeo de respuesta  apartir de un filtrado por propiedades name y voterKey
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) => (term === '' ? this.item : this.item.filter(v => v.IMEI.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)),
      map(item => item.map(item => item.IMEI )) // <-- Agrega esta línea
    );
  };
  //Método para que con un parámetro de tipo event$ pueda manipular la selección que haga el ususario de un Customer
  onSelectItem(event: NgbTypeaheadSelectItemEvent) {
    const selectedValue = event.item; // Esto será algo como "Nombre - ClaveDeVotante"
    // Busca el cliente seleccionado en tu arreglo de clientes
    const selectedItem = this.item.find(customer => customer.IMEI === selectedValue);

    if (selectedItem) {
      // Aquí puedes hacer lo que quieras con el cliente seleccionado
      console.log(selectedItem)
      this.items = selectedItem
      this.showCardItem = true
      this.showBtnItem = false
    }
  }
  // Método para agregar un artículo en el arreglo de tarjetas de exchanges
  addExchange(form : ProductModel){
    console.log(form)
    this.exchangeCard.push(form)
    if(this.exchangeCard.length == 3)
    this.showBtnExch = false
  }
  clickInfo(exchange:ProductModel){
    this.infoExchange = exchange
  }
  // Método para eliminar tarjetas
  deleteExchange(){
    this.exchangeCard = this.exchangeCard.filter(it => it != this.infoExchange)
    if(this.exchangeCard.length <3)
    this.showBtnExch = true
  }
  deleteCustomer(){
    this.showBtn = true
    this.showCard = false
  }
  deleteItem(){
    this.showBtnItem = true
    this.showCardItem = false
  }
  getTotalPrice() {
    let itemPrice = Number(this.items.price)
    let initialPay = Number (this.initialPay)
    // Suma los precios de todos los artículos de intercambio
    const exchangeTotal = this.exchangeCard.reduce((total, exchange) => total + Number(exchange.price), 0)
    itemPrice = itemPrice-exchangeTotal
    this.subtotal = String (itemPrice)
    return itemPrice - initialPay
  }
  // Método para recolectar los datos del modal de Customer y mostrarlos en una tarjeta
  addNewCustomer(form:CustomerModel){
    console.log(form)
    this.showCard = true
    this.showBtn = false
    form.status = 'sin deuda'
  }
//Método que se ejecutara al finalizar una compra
  async saleEnd(){
    if(!(this.customer.find(customer => customer.voterKey == this.customers.voterKey))){
    this.databaseService.addDocumentC("customers",this.customers,this.customers.email)
    }
    console.log("customer")
    this.itemId = await this.databaseService.getDocIdByField("inventory","IMEI",this.items.IMEI)
    this.databaseService.updateInventory("inventory",this.itemId,{location : 'vendido'})
    for (let i = 0; i < this.exchangeCard.length; i++) {
      //this.databaseService.addExchange("exchanges",this.exchangeCard[i])
      switch (i) {
      case 0:
        this.sale.exchanges!.idOne = this.exchangeCard[i].IMEI
        console.log(this.sale.exchanges!.idOne)
      break;
      case 1:
        this.sale.exchanges!.idTwo = this.exchangeCard[i].IMEI
        console.log(this.sale.exchanges!.idTwo)
      break;
      case 2:
        this.sale.exchanges!.idThree = this.exchangeCard[i].IMEI
        console.log(this.sale.exchanges!.idThree)
      break;
    }
      console.log("item")
    }
    this.user = this.sessionService.getUserValue$()?.email!!
    this.sale.employeeId = this.user
    this.sale.productId = this.itemId // Guarda id del doc
    this.sale.saleDate = this.date
    this.sale.debtId = "0"
    this.sale.voterKey = this.customers.voterKey
    this.sale.payment = this.paymentModel
    this.databaseService.addSale("sales",this.sale)
  }
}
