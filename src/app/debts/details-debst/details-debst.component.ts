import { Component } from '@angular/core';
import { NavService } from '../../../model/utils/navbar.util';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DebtModel } from '../../../model/entities/debt.model';
import { FirestoreService } from '../../../model/api/firestore.service';

@Component({
  selector: 'app-details-debst',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './details-debst.component.html',
  styleUrl: './details-debst.component.scss'
})
export class DetailsDebstComponent {
  debt: DebtModel = {
    debtAmount: '',
    employeeId: '',
    voterKey: '',
    initialDate: new Date,
    finalDate: new Date,
    status: '',
    idVenta: '',
    total: '',
    pays: []
  }
  idDebt:string = '' //el es el idVenta que se recibira como parametro

  constructor(private navService: NavService,
    private activatedRoute:ActivatedRoute, private databaseService:FirestoreService){
    this.navService.toggleNav(true)
  }
  async ngOnInit(){
    this.idDebt = String(this.activatedRoute.snapshot.paramMap.get('idDebt'))
    this.debt = await this.databaseService.getDebt(this.idDebt)
  }
}
