import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class AlertsService {

   Toast = Swal.mixin({
      toast: true,
      position: 'center',
      iconColor: 'white',
      customClass: {
                      popup: 'colored-toast',
                    },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    })
  constructor() { }

  sendOkMessage(message: string){
      this.Toast.fire({
        icon: 'success',
        title: message,
      })
  }
}
