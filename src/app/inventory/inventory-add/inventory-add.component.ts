import {Component} from '@angular/core';
import {FormsModule, NgForm, NgModel} from "@angular/forms";
import {ProductModel} from "../../../model/entities/product.model";
import {NgClass} from "@angular/common";
import {SessionService} from "../../../model/utils/session.service";
import {RouterLink} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {InventoryService} from "../../../model/utils/observables/inventory.service";
import {NgxCroppedEvent, NgxPhotoEditorService} from "ngx-photo-editor";
import {DOC_ORIENTATION, NgxImageCompressService} from "ngx-image-compress";

@Component({
  selector: 'app-inventory-add',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    RouterLink
  ],
  templateUrl: './inventory-add.component.html',
  styleUrl: './inventory-add.component.scss'
})
export class InventoryAddComponent {
  currentUser: string = 'Sin usuario'
  isLoading: boolean = false
  constructor(
    private session: SessionService,
    private toast: ToastrService,
    private inventoryService: InventoryService,
    private photoEditorService: NgxPhotoEditorService,
    private compressService: NgxImageCompressService
  ) {
    this.currentUser = this.session.getUserValue$()?.email!!
  }

  async addToInventory(product: ProductModel, form: NgForm) {
    this.isLoading = true
    product.entryDate = new Date()
    product.batteryState = product.batteryState || 'No aplica'
    product.storageCapacity = product.storageCapacity || 'No aplica'
    product.storageUnit = product.storageUnit || 'No aplica'
    product.location_employee = product.location_employee || 'No aplica'
    product.location_customer = product.location_customer || ''
    await this.inventoryService.addProduct(product)
      .then(() => {
        this.toast.success('Producto agregado al inventario correctamente.', 'NUEVO PRODUCTO')
        form.resetForm({employeeId: this.session.getUserValue$()?.email!!})
      })
      .finally(() => {
        this.isLoading = false
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
