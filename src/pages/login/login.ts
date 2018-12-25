import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  AlertController
} from "ionic-angular";
import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth";
import { HomePage } from "../home/home";
import { FcmProvider } from "../../providers/fcm/fcm";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  user = {} as User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public fcmService: FcmProvider
  ) {}

  async login(user: User) {
    try {
      const result = this.afAuth.auth
        .signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
          this.fcmService.getToken();
          this.navCtrl.setRoot(HomePage).then(() => {
            {
              let toast = this.toastCtrl.create({
                message: "Logged in successfully",
                duration: 3000,
                position: "top"
              });

              toast.onDidDismiss(() => {
                console.log("Dismissed toast");
              });

              toast.present();
            }
          });
        });

      // this.navCtrl.setRoot(HomePage);
    } catch (e) {
      console.error(e);

    }
  }
}
