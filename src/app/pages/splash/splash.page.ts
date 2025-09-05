import { Component }  from "@angular/core";
import { Router } from "@angular/router";
import {IonContent} from '@ionic/angular/standalone';

@Component({
  selector: "app-splash",
  templateUrl: "./splash.page.html",
  styleUrls: ["./splash.page.scss"],
  standalone: true,
  imports: [IonContent]
})
export class Splashpage {
  private SplashTimer: any;
  constructor(private router: Router){    
  }

  ngOnInit(){
    console.log("timer inicializado");

    //inicia el timer y redirecciona al home
    this.SplashTimer = setTimeout(() => {
      this.navigateToHome()
    }, 3000);    
  }

  ngOnDestroy(){
    if(this.SplashTimer){
      clearTimeout(this.SplashTimer);
      console.log("Splash terminado");
    }
}

private navigateToHome():void{
  //log
  console.log("Inicializando home ...");
  this.router.navigate(["/home"]),
  { 
    replaceUrl: true 
  }
}
}