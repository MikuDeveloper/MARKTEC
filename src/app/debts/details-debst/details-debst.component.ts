import { Component } from '@angular/core';
import { NavService } from '../../../model/utils/navbar.util';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DebtModel, Pays } from '../../../model/entities/debt.model';
import { FirestoreService } from '../../../model/api/firestore.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;
import moment from 'moment';

@Component({
  selector: 'app-details-debst',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    CommonModule,
    FormsModule],
  templateUrl: './details-debst.component.html',
  styleUrl: './details-debst.component.scss'
})
export class DetailsDebstComponent {
  debt: DebtModel = {
    debtAmount: '',
    employeeId: '',
    voterKey: '',
    initialDate: new Date(),
    finalDate: new Date(),
    status: '',
    idVenta: '',
    total: '',
    pays: []
  }
  idDebt:string = '' //el es el idVenta que se recibira como parametro
  pay: Pays = {
    datePay: new Date,
    payAmount: '',
    paymentMethod: '',
    folio:'',
    concept:''
  }

  pays:Pays []=[]

  initalDate:undefined | string
  finalDate:string | undefined

  constructor(private navService: NavService,
    private activatedRoute:ActivatedRoute, private databaseService:FirestoreService){
    this.navService.toggleNav(true)
  }

  async ngOnInit(){
    this.idDebt = String(this.activatedRoute.snapshot.paramMap.get('idDebt'))
    this.debt = await this.databaseService.getDebt(this.idDebt)
    this.pays = this.debt.pays

    this.debt.initialDate  = (<Timestamp><unknown>this.debt.initialDate ).toDate();
    this.initalDate = moment(this.debt.initialDate).format('DD/MM/YYYY - HH:mm:ss');
    this.debt.finalDate = (<Timestamp><unknown>this.debt.finalDate ).toDate();
    this.finalDate =  moment(this.debt.finalDate).format('DD/MM/YYYY - HH:mm:ss');
    for(let i=0; i < this.debt.pays.length; i++)
    {
      this.debt.pays[i].datePay = moment((<Timestamp><unknown>this.debt.pays[i].datePay).toDate()).format('DD/MM/YYYY - HH:mm:ss');

    }
    //this.debt.initialDate = new Date(this.debt.initialDate * 1000);
    //this.debt.finalDate = new Date(this.debt.finalDate * 1000);
  }
  addPay(pay:Pays){
    if(pay.paymentMethod == "Efectivo"){
      pay.datePay = new Date()
    }
    this.databaseService.addPay(this.idDebt,pay).then(() =>{
      pay.datePay = moment(pay.datePay).format('DD/MM/YYYY - HH:mm:ss');
      this.pays.push(pay)
    })
  }
}
