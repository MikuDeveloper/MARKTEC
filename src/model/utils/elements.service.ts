import { Injectable } from '@angular/core';
import * as bootstrap from "bootstrap";

@Injectable({
  providedIn: 'root'
})
export class ElementsService {
  constructor() { }
  initializePopovers() {
    document.querySelectorAll('[data-bs-toggle="popover"]').forEach(element => new bootstrap.Popover(element))
  }
  initializeTooltips() {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(element => new bootstrap.Tooltip(element, { html: true, customClass: 'custom-tooltip'}))
  }
  initializeDropdowns() {
    document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(element => new bootstrap.Dropdown(element))
  }
  createToast(id: string) {
    let element = document.getElementById(id) as Element
    let toast = new bootstrap.Toast(element)
    toast.show()
  }
}
