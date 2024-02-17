import { Component, ViewChild } from '@angular/core';
import { NavService } from "../../model/utils/navbar.util";
import { CustomerModel } from '../../model/entities/customer.model';
import { FirestoreService } from '../../model/api/firestore.service';
import { CommonModule } from '@angular/common';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead.module';
import { Observable, OperatorFunction, Subject, debounceTime, distinctUntilChanged, filter, map, merge, timestamp } from 'rxjs';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductModel } from '../../model/entities/product.model';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { SessionService } from '../../model/utils/session.service';
import { User } from 'firebase/auth';
import { Exchanges, Payment, SaleModel } from '../../model/entities/sale.model';
import { DebtModel, Pays } from '../../model/entities/debt.model';

import { NgxCroppedEvent, NgxPhotoEditorService } from 'ngx-photo-editor';
import { DOC_ORIENTATION, NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [FormsModule,CommonModule,NgbTypeaheadModule],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent {
  currentUser: string = 'Sin usuario'
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
  // Objetos y variables para manipular los customers, la visibilidad de la tarjeta y el botón de agregar
  originalCustomers:CustomerModel[] =[] // arreglo para almacenar los customers y filtrarlos
  customer:CustomerModel[] =[] // arreglo para mostrar el customer filtrado o el customer creado
  showCard : boolean = false // variable para mostrar u ocultar tarjeta de datos de customer
  showBtn : boolean = true // variable para mostrar u ocultar boton para nuevo customer

  // Objetos y variables para manipular los artículos de venta, la visibilidad de la tarjeta y el botón de agregar
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
 // variable que se usa para almacenar el id del Documento del artículo vendido y poder así modificar su location a vendido
  itemId : string = ''
  showCardItem: boolean = false; //variable para mostrar o no la tarjeta de artículo de venta
  showBtnItem: boolean = true; //variable para mostrar o no la boton de artículo de venta

  // Funciones para las dos barras de búsqueda y sus instancias correpsondientes y variables bidireccionales
  @ViewChild('instance', { static: true })
  instance!: NgbTypeahead; // varibale de instancia
  model : string = '' // [(ngModel)] variable
  focus$ = new Subject<string>(); // variable para el focus que permite mostrar 10 opciones sin haber escrito aún.
  click$ = new Subject<string>(); // variable para detectar cuando el usuario da click en la barra de búsqueda.
  @ViewChild('instanceItem', { static: true })
  instanceItem!: NgbTypeahead; // varibale de instancia
  modelItem: string = '' // [(ngModel)] variable
  focusItem$ = new Subject<string>(); // variable para el focus que permite mostrar 10 opciones sin haber escrito aún.
  clickItem$ = new Subject<string>(); // variable para detectar cuando el usuario da click en la barra de búsqueda.


  // Objetos y variables para manipular los customers, la visibilidad de la tarjeta y el botón de agregar
  exchangeCard: ProductModel [] = [] // arreglo para almacenar los objetos tipo ProductModel de exchange
  // Objeto que se llenara en el modal de agregar producto y luego se agregara al arreglo exchangeCard
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
  originalExchangeItems : ProductModel [] = []
  exchangeItems : ProductModel [] = []
  // Objeto que guardara momentaneamente los datos del objeto a eliminar o editar.
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
  showBtnExch : boolean = true  // Botón que desplegara un modal para agregar un artículo de intercambio

  date : Date =  new Date() //variable para almacenar la fecha y agregarla a sale y a debt
  user : string | undefined | null // variable para almacenar el usuario loggeado
  initialPay : string ='' // variable para recibir el pago inicial
  paymentMethod : string = '' // variable para recibir el Método de Pago
  subtotal : string = '' // variable para mostrar el subtotal calcualdo en un método

  // Objetos para almacenar los datos necesarios del pago inicial y demás inforamción de la venta
  sale: SaleModel = {
    saleId: 'sale1',
    payment: {
      productPrice: '',
      subtotal: '',
      initialPay: '',
      paymentMethod: this.paymentMethod,
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

  idVenta : string = ''

  // Objeto de tipo DebtModel para crear la deuda
  debt : DebtModel={
    debtAmount: String(this.getTotalPrice()),
    employeeId: '',
    voterKey: this.customers.voterKey,
    initialDate: new Date(),
    finalDate: new Date(),
    status: 'Pendiente',
    idVenta: '',
    total: String(this.getTotalPrice()),
    pays: []
  }
  debtPay : Pays = {
      datePay: new Date(),
      payAmount:this.initialPay,
      paymentMethod: this.paymentMethod,
      folio:'',
      concept:'Primer Pago'
  }
  constructor(private navService: NavService,
    private databaseService: FirestoreService,
    private sessionService:SessionService,
    private photoEditorService: NgxPhotoEditorService,
    private compressService: NgxImageCompressService) {
    this.navService.toggleNav(true);
    this.currentUser = this.sessionService.getUserValue$()?.email!!
  }
  async ngOnInit(){
    // Aquí, estás obteniendo datos de la colección "customers" de tu base de datos.
    // La función getCollectionDataC() es una función asíncrona, por lo que utilizas 'await' para esperar a que se resuelva antes de continuar.
    this.originalCustomers = await this.databaseService.getCollectionDataC("customers");
    // Estás haciendo una copia de los datos originales de los clientes para poder manipularlos sin alterar los datos originales.
    this.customer = [...this.originalCustomers]
    // Método para recibir los datos de los artículos del inventario
    this.originalItem = await this.databaseService.getCollectionDataTest("inventory")
    // Método para filtrar los artículos de venta y eliminar los que tenga la location igual a vendido
    this.originalItem = this.originalItem.filter(item => item.location != 'vendido')
    // Se copian los datos a otro arreglo que nos servira al momento de usar el NgbTypeahead
    this.exchangeItems = await this.databaseService.getCollectionDataTest('exchanges')
    this.exchangeItems = this.exchangeItems.filter(item => item.location != 'vendido')
    this.item = [...this.originalItem,...this.exchangeItems]
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
  addExchange(form : NgForm){
    console.log(form)
    this.exchangeCard.push(<ProductModel> form.value)
    if(this.exchangeCard.length == 3)
    this.showBtnExch = false
    form.resetForm()
  }
   // Método para recolectar los datos del modal de Customer y mostrarlos en una tarjeta
   addNewCustomer(form:NgForm){
    console.log(form)
    this.customer.push(<CustomerModel> form.value)// <- creo que no funciona jaja
    // Asignar los datos del formulario al objeto customers
    Object.assign(this.customers, form.value)
    this.showCard = true
    this.showBtn = false
    form.value.status = 'sin deuda'
    form.resetForm()
  }
  clickInfo(exchange:ProductModel){
    this.infoExchange = exchange
  }
  // Método para eliminar tarjetas de exchange
  deleteExchange(){
    this.exchangeCard = this.exchangeCard.filter(it => it != this.infoExchange)
    if(this.exchangeCard.length <3)
    this.showBtnExch = true
  }
  // Método para eliminar tarjetas de customer
  deleteCustomer(){
    this.showBtn = true
    this.showCard = false
  }
  // Método para eliminar tarjetas de artículo de venta
  deleteItem(){
    this.showBtnItem = true
    this.showCardItem = false
  }
  getSubtotal() {
    let itemPrice = Number(this.items.price)
    // Suma los precios de todos los artículos de intercambio
    const exchangeTotal = this.exchangeCard.reduce((total, exchange) => total + Number(exchange.price), 0)
    itemPrice = itemPrice-exchangeTotal
    this.subtotal = String (itemPrice)
    return this.subtotal
  }
  //Mpetodo para obtener total a pagar
  getTotalPrice() {
    let initialPay = Number (this.initialPay)
    return Number (this.getSubtotal()) - initialPay
  }

//Método que se ejecutara al finalizar una compra
  async saleEnd(){
    if(!(this.customer.find(customer => customer.voterKey == this.customers.voterKey))){
    this.databaseService.addDocumentC("customers",this.customers,this.customers.email)
    } // agrega a un nuevo customer si no existe en la base de datos
    console.log("customer")
    this.itemId = await this.databaseService.getDocIdByField("inventory","IMEI",this.items.IMEI)

    this.databaseService.updateInventory("inventory",this.itemId,{location : 'vendido'})
    for (let i = 0; i < this.exchangeCard.length; i++) {
      this.databaseService.addExchange("exchanges",this.exchangeCard[i])
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

    this.user = this.sessionService.getUserValue$()?.email!! //Servicio para a recibir el usuario loggeado
    this.sale.employeeId = this.user // alamacena el id del usuario
    this.sale.productId = this.itemId // Guarda id del doc
    this.sale.saleDate = this.date // almacena la fecha del momento de la venta
    this.sale.debtId = "0" // almacena el id que se genera para una posible deuda
    this.sale.voterKey = this.customers.voterKey // se almacena el voterKey del customer
    this.sale.payment = this.paymentModel // se almacenan todos los datos del payment
    this.debt.employeeId = this.user
    // Agregamos un doc nuevo a la colección sales y guardamos el Id del doc en debt
    this.databaseService.addSale("sales",this.sale).then(docId => {
      this.idVenta = docId
      this.debtPay.payAmount = this.initialPay
      this.debtPay.paymentMethod = this.paymentMethod
       //this.debt.pays.folio:'',
      //this.debt.pays.concept:''
      if(this.getTotalPrice() > 0){
        this.debt.debtAmount =  String(this.getTotalPrice())
        this.debt.voterKey = this.customers.voterKey
        this.debt.idVenta = this.idVenta
        this.debt.total = String(this.getTotalPrice())
        this.debt.pays.push(this.debtPay)

        this.databaseService.addDebt("debts",this.debt).then(docId => {
          this.databaseService.updateSale("sales",this.idVenta,{debtId : docId}).then(it =>{
            console.log(this.debt)
          })
        })
      }
    })
  }

  editAndCompressImage($event: Event, inputFile: NgModel, imgElement: HTMLImageElement) {
    let imgFile : File = (<HTMLInputElement> $event.target).files![0]
    if (imgFile) {
      imgElement.src = 'assets/icons/img_placeholder.png'
      this.photoEditorService.open($event, {
        autoCropArea: 1,
        viewMode: 1,
        applyBtnText: 'Guardar',
        closeBtnText: 'Cancelar'
      }).subscribe((data: NgxCroppedEvent) => {
        this.compressService.compressFile(<string> data.base64, DOC_ORIENTATION.Default, 50, 50)
          .then((dataUrl: string) => {
            imgElement.src = dataUrl
          })
      })
      //Cancel button for photo editor
      let ngxBtn = <HTMLButtonElement> document.querySelector('.ngx-pe-btn')
      ngxBtn.onclick = () => {
        this.deleteImage(imgElement, inputFile)
      }
    } else {
      this.deleteImage(imgElement, inputFile)
    }
  }

  deleteImage(imgElement: HTMLImageElement, inputFile: NgModel) {
    imgElement.src = ''
    inputFile.reset()
  }
}
