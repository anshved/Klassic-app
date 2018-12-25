import { Component } from "@angular/core";
import {
  NavController,
  ActionSheet,
  ActionSheetController,
  Item,
  ToastController
} from "ionic-angular";
import { AddItemPage } from "../add-item/add-item";
import {
  AngularFireDatabase,
  AngularFireList,
  snapshotChanges
} from "angularfire2/database";
import * as Fuse from "fuse.js";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { StockList } from "../../models/stock-list.iterface";
import { EditItemPage } from "../edit-item/edit-item";
import { FcmProvider } from "../../providers/fcm/fcm";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  stockListRef$: any;
  stockList: Observable<any[]>;
  books: any;
  itemName: any;
  searchResults = [];

  constructor(
    public navCtrl: NavController,
    private database: AngularFireDatabase,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    public fcm: FcmProvider
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

  ionViewDidLoad(){
    this.fcm.getToken()

    this.fcm.listenToNotifications().pipe(
      tap(msg => {
        const toast = this.toastCtrl.create({
          message: msg.body,
          duration: 3000
        });
        toast.present();
      })
    )
    .subscribe()
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
              this.stockListRef$.remove(stockList.key).then(() => {
                {
                  let toast = this.toastCtrl.create({
                    message: "Item was deleted successfully",
                    duration: 3000,
                    position: "top"
                  });

                  toast.onDidDismiss(() => {
                    console.log("Dismissed toast");
                  });

                  toast.present();
                }
              });
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
