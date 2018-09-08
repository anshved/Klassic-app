import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController } from "ionic-angular";
import { AngularFireDatabase } from "angularfire2/database";
import { StockList } from "../../models/stock-list.iterface";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@IonicPage()
@Component({
  selector: "page-edit-item",
  templateUrl: "edit-item.html"
})
export class EditItemPage {
  stockListRef$: any;
  stockItem = {};
  stockListId;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase,
    private toastCtrl: ToastController
  ) {
    this.stockListId = this.navParams.get("stockListId");

    this.stockListRef$ = this.database
      .object(`stockList/${this.stockListId}`)
      .valueChanges()
      .subscribe(stock => {
        this.stockItem = stock;
      });
  }

  editItem(stock) {
    this.database.object(`stockList/${this.stockListId}`).update(stock).then(() => {
      {
        let toast = this.toastCtrl.create({
          message: 'Item was edited successfully',
          duration: 3000,
          position: 'top'
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
      
        toast.present();
      }
    }) ;
    this.navCtrl.pop();
    
  }
}