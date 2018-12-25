import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Firebase } from "@ionic-native/firebase";
import { Platform } from "ionic-angular";
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireDatabase } from "angularfire2/database";

/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FcmProvider {
  constructor(
    public firebaseNative: Firebase,
    public db: AngularFireDatabase,
    private platform: Platform
  ) {  }




async getToken(){
  let token;
  token = await this.firebaseNative.getToken();

  return this.saveTokenToFirestore(token)
}

private saveTokenToFirestore(token){
  if(!token) return
  const devicesRef = this.db.object(`notification-tokens/${token}`).set(true)
  return devicesRef;
}

listenToNotifications(){
  return this.firebaseNative.onNotificationOpen()
}

}
