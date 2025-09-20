import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonInput, IonInputPasswordToggle, ToastController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonInput, IonInputPasswordToggle, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  loginData = {
    username: '',    
    password: ''
  };

  constructor(
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() { }

  //VALIDAR FORMULARIO
  validForm(): boolean {
    if (!this.loginData.username.trim()) {
      this.showToast('Ingresa tu nombre de usuario', 'danger');
      return false;
    }

    if (!this.loginData.password.trim()) {
      this.showToast('Ingresa tu contraseña', 'danger');
      return false;
    }

    return true;
  }

  async profile() {
    if (!this.validForm()) {
      return; 
    }

    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    if (registeredUsers.length === 0) {
      await this.showToast('No hay usuarios registrados. Regístrate primero.', 'warning');
      return;
    }

    const user = registeredUsers.find((u: any) => 
      u.username.toLowerCase() === this.loginData.username.toLowerCase()
    );

    //USUARIO NO CREADO
    if (!user) {
      await this.showToast(`El usuario "${this.loginData.username}" no existe. Verifica el nombre o regístrate.`, 'danger');
      return;
    }

    //CONTRASEÑA INCORRECTA

    if (user.password !== this.loginData.password) {
      await this.showToast('Contraseña incorrecta. Inténtalo de nuevo.', 'danger');
      return;
    }

    //MENSAJE DE EXITO
    const userSession = {
      username: user.username,
      email: user.email,
      lastname: user.lastname,
      tel: user.tel,
      loginAt: new Date().toISOString()
    };
    
  // GUARDAR SESION EN LOCAL STORAEG
    localStorage.setItem('currentUser', JSON.stringify(userSession));

    //SALUDO USUARIO DEPENDIENDO LA HORA Y SU NOMBRE
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches';
    
    await this.showToast(`${greeting}, ${user.username}! `, 'success');
    
    this.goToProfile();
  }

  private async showToast(message: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: color,
      position: 'top'
    });
    toast.present();
  }

  
  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}