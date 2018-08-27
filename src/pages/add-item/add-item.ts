import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
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
    private database: AngularFireDatabase
  ) {
    this.stockListRef$ = this.database.list("stockList")
  }

  addItem(stockList: StockList){
this.stockListRef$.push(stockList).then(() =>{
  console.log("succsessfully pushed");
});
  }
}
