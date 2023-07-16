import { Injectable } from '@angular/core';
import { AlertServiceService } from './alert-service.service';
import { Router } from '@angular/router';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor(private alertService: AlertServiceService, private router: Router, private sessionService: SessionService) { }

  catchErrorCodes(code: any) {
    switch (code) {
      case 13:
        this.alertService.alertMessage('Para más información contacta con el administrador del sistema.', 'Cuenta bloqueada');
        this.resetAll();
        break;
      case 14:
        this.alertService.alertMessage('Sesión caducada Por favor ingresa nuevamente.', 'Sesión expiró');
        this.resetAll();
        break;
      case 20:
        this.alertService.alertMessage('Combinación usuario/clave no válida.', 'Credenciales no coinciden');
        break;
      case 21:
        this.alertService.alertMessage('Email ya esta registrado.', 'Datos no aceptados');
        break;
      default:
        break;
    }
  }
  resetAll() {
    this.sessionService.logOut()
    this.router.navigate(['/login'])
  }
}
