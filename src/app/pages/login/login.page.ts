import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg,IonInputPasswordToggle } from '@ionic/angular/standalone';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { IonInput } from '@ionic/angular/standalone';
import { IonButton } from '@ionic/angular/standalone';
import { IonIcon } from '@ionic/angular/standalone';
import { IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent,  IonInput, IonIcon, IonItem,IonInputPasswordToggle ]
})
export class LoginPage implements OnInit {

  showPassword = false;

  ngOnInit() {}

}
