import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonAvatar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ]
})
export class ProfilePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
