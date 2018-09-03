import { Component } from "@angular/core";
import {
  NavController,
  ActionSheet,
  ActionSheetController,
  Item
} from "ionic-angular";
import { AddItemPage } from "../add-item/add-item";
import {
  AngularFireDatabase,
  AngularFireList,
  snapshotChanges
} from "angularfire2/database";
import * as Fuse from "fuse.js";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { StockList } from "../../models/stock-list.iterface";
import { EditItemPage } from "../edit-item/edit-item";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  stockListRef$: any;
  stockList: Observable<any[]>;
  books: any;
  itemName: any;
  searchResults = []

  constructor(
    public navCtrl: NavController,
    private database: AngularFireDatabase,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.stockListRef$ = this.database.list("stockList");
    this.stockList = this.database
      .list("stockList")
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  selectStockList(stockList: StockList) {
    this.actionSheetCtrl
      .create({
        title: `${stockList.itemName}`,
        buttons: [
          {
            text: "Edit",
            handler: () => {
              this.navCtrl.push(EditItemPage, { stockListId: stockList.key });
            }
          },
          {
            text: "Delete",
            role: "destructive",
            handler: () => {
              this.stockListRef$.remove(stockList.key);
            }
          },
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              console.log("The user has selected cancel button");
            }
          }
        ]
      })
      .present();
  }

  navigateToAddItemPage() {
    this.navCtrl.push(AddItemPage);
  }

  searchBar() {

    this.database
      .object("stockList")
      .valueChanges()
      .subscribe(data => {
        this.books = Object.keys(data).map(key => {
          return data[key];
        });
         var options = {
          keys: ["itemName"]
        };
        var fuse = new Fuse(this.books, options);
    
        this.searchResults = fuse.search(this.itemName);
      });
  }
}