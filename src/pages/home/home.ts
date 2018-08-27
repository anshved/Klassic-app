import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AddItemPage } from "../add-item/add-item";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(public navCtrl: NavController) {}

  navigateToAddItemPage(){
    this.navCtrl.push(AddItemPage)
  }
}
