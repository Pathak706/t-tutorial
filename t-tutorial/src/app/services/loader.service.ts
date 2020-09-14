import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  loading: any;
  constructor(public loadingController: LoadingController) {}

  async showLoader(msg): Promise<void> {
    try {
      this.loading = await this.loadingController.create({
        spinner: "lines",
        message: msg,
        translucent: true,
        cssClass: "loader-wrap",
      });
      await this.loading.present();
    } catch (e) {
      /* handle errors */ console.log(e);
    }
  }

  async hideLoader() {
    try {
      return await this.loading.dismiss();
    } catch (e) {
      console.log(e);
    }
  }
}
