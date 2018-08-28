import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AddItemPage } from "../add-item/add-item";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  stockListRef$: any;
  stockList: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    private database: AngularFireDatabase
  ) {
    this.stockList = this.database.list("stockList").valueChanges();
  }
  navigateToAddItemPage() {
    this.navCtrl.push(AddItemPage);
  }
}
// try ion item or ionlist instead of div tag
//nhi re wo nahi hai
//kya error tha
//me 2 min ke liye hatt gayatha
//ahbhi toh ho raha hena??
//ha, rxjs installed nahi tha
//thats it? ha
//okay thanks
//kyu nahi install hua no idea
//by default hona chahiye when creating app
//okay
//thanks
// ek command run kiya bas
//Chal bye


