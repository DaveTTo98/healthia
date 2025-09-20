import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonInputPasswordToggle, IonCheckbox, ToastController, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonButton, IonCheckbox, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInputPasswordToggle]
})
export class RegisterPage implements OnInit {

  registerData = {
    names: '',
    lastname: '',
    email: '',
    tel: '',
    password: '',
    repeatPassword: '',
    terms: false
  };

  constructor(
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() { }

  validForm(): boolean {
    // Validar que todos los campos estén llenos
    if (!this.registerData.names.trim()) {
      this.showToast('El nombre es requerido', 'danger');
      return false;
    }

    if (!this.registerData.lastname.trim()) {
      this.showToast('El apellido es requerido', 'danger');
      return false;
    }

    if (!this.registerData.email.trim()) {
      this.showToast('El email es requerido', 'danger');
      return false;
    }

    if (!this.validateEmail(this.registerData.email)) {
      this.showToast('Ingresa un email válido', 'danger');
      return false;
    }

    if (!this.registerData.tel.trim()) {
      this.showToast('El teléfono es requerido', 'danger');
      return false;
    }

    if (!this.registerData.password.trim()) {
      this.showToast('La contraseña es requerida', 'danger');
      return false;
    }

    if (this.registerData.password.length < 8) {
      this.showToast('La contraseña debe tener al menos 8 caracteres', 'danger');
      return false;
    }

    if (!this.registerData.repeatPassword.trim()) {
      this.showToast('Confirma tu contraseña', 'danger');
      return false;
    }
    if (this.registerData.password !== this.registerData.repeatPassword) {
      this.showToast('Las contraseñas no coinciden', 'danger');
      return false;
    }

    if (!this.registerData.terms) {
      this.showToast('Debes aceptar los términos y condiciones', 'danger');
      return false;
    }

    return true;
  }
  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
  async register() {

    if (!this.validForm()) {
      return; 
    }

    const newUser = {
      username: this.registerData.names.trim(),
      password: this.registerData.password,
      email: this.registerData.email.trim().toLowerCase(),
      lastname: this.registerData.lastname.trim(),
      tel: this.registerData.tel.trim(),
      registeredAt: new Date().toISOString()
    };


    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');


    const usernameExists = existingUsers.find((user: any) => 
      user.username.toLowerCase() === newUser.username.toLowerCase()
    );

    if (usernameExists) {
      await this.showToast(`El usuario "${newUser.username}" ya existe. Elige otro nombre.`, 'danger');
      return;
    }

   
    const emailExists = existingUsers.find((user: any) => 
      user.email.toLowerCase() === newUser.email.toLowerCase()
    );

    if (emailExists) {
      await this.showToast('Ya existe un usuario con ese email', 'danger');
      return;
    }

    existingUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
    await this.showToast(`¡Te damos la bienvenida a Healthia ${newUser.username}! Tu cuenta ha sido creada exitosamente.`, 'success');
    
    // Ir al login
    this.router.navigate(['/login']);
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
  goToLogin() {
    this.router.navigate(['/login']);
  }
}