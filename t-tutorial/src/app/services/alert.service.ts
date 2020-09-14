import { Injectable } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public alertController: AlertController ,private platform: Platform) {
    
  }

  async promptAlert(subheader, message) {
    const alert = await this.alertController.create({
      subHeader: subheader,
      message: message,
      cssClass: 'alert-wrap',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'btn btn-plane white-btn border-top',
          handler: () => {
            // console.log('Confirm Cancel: blah');
            // this.navCtrl.navigateRoot(['/tabs']);
          }
        }
      ]
    });
    await alert.present();
  }


  async promptExitAlert() {
    this.platform.backButton.subscribe(() => {
      this.exitApp();
    });
  }

  async closeExitAlert() {
    this.platform.backButton.unsubscribe(); 
  }

  async exitApp() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to exit the app?',
      cssClass: 'alert-wrap',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'btn border-right',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          cssClass: 'btn',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });
    alert.present();
  };

  sentEmail() {
    // console.log('email')
  }

}
