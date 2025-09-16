import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonInputPasswordToggle, IonCheckbox, ToastController, IonButton } from '@ionic/angular/standalone';
import { Route, Router } from '@angular/router';

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

  constructor(private router: Router,
    private toastController: ToastController) { }



  ngOnInit() { }

  validForm(): boolean {

    return this.registerData.names.trim() !== '' &&
      this.registerData.lastname.trim() !== '' &&
      this.registerData.email.trim() !== '' &&
      this.validateEmail(this.registerData.email) &&
      this.registerData.tel.trim() !== '' &&
      this.registerData.password.trim() !== '' &&
      this.registerData.repeatPassword.trim() !== '' &&
      this.registerData.password === this.registerData.repeatPassword &&
      this.registerData.terms;
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  async register() {
    if(!this.validForm()) {
      await this.showToast('Por favor completa los datos correctamente', 'danger');
      return;
  }
}

//SHOW ERROR MESSAGE
private async showToast(message: string, color: 'success' | 'danger' | 'warning') {
  const toast = await this.toastController.create({
    message,
    duration: 2000,
    color: color,
    position: 'top'
});
  toast.present(); // visibiliza el mensaje
};


  goToLogin() {
    console.log('Navigating to login page');
    this.router.navigate(['/login']);
  }





}
