import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController } from "ionic-angular";
import { StockList } from "../../models/stock-list.iterface";
import { AngularFireDatabase } from "angularfire2/database";
@IonicPage()
@Component({
  selector: "page-add-item",
  templateUrl: "add-item.html"
})
export class AddItemPage {
  stockList = {} as StockList;
  stockListRef$: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase,
    private toastCtrl: ToastController
  ) {
    this.stockListRef$ = this.database.list("stockList")
    
  }

  addItem(stockList: StockList){
this.stockListRef$.push(stockList).then(() =>{
  {
    let toast = this.toastCtrl.create({
      message: 'Item was added successfully',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
});

this.navCtrl.pop();
  }
}
