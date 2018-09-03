import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
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
  // stockList = {} as StockList;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase
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
    this.database.object(`stockList/${this.stockListId}`).update(stock);
  }
}

//muje samja  hi nai tu kya kiaa???
//Kaise samjau ab
//mene bhi subscribe try kia tha...
//nai hua mujse..
//tu free hoga jis din..uss din college me mil..
//ministry se reply aaya?
//nhi
//kab tak expected hai reply?
//Humg log 15th sept tak expect kar rahe hai
//me 4th se 8th pune jaa raha hu
//college se.. TT?..yes. Jeet ke anaa
//bhai national level game hai..
//ill do my best Ha
//Tu angularka tour of heroes kar pehle angular samajh.. f
//Fir firebase pe aa
//okay
//youtube??
//aaj pura din yehi kar raha hu..
//search bar kaise implement karneka??
//Kaisa search chahiye exact ki typos chalega
//arey tu search chaalu kia toh relevent dikhna chaiye../
//like A type kia toh sab A waale.
// Ye use kar fir
// Keys me konse parameter se search karna hai wo dalne ka
//tere me itemName ayega
//haa
//Aur array of objects ke liye use list
//where?
/*db.list('stockList').valueChanges().subscribe(data=>{
  this.books = data
})
baki same
import * as fuse from { fuse.js }
var options = {
  keys: ['itemName'],
};
var fuse = new Fuse(books, options)

fuse.search('engsh')
*/
//angular bohot karna padega meko..
//confuse ho jata hu me
//Hmm wo kar tour of heroes chota hai
// Ha kar
//search bar ho jaayega merese implement?
//ha
//pele search bar complete kardu?
//toh mera app pura ho jaaye
///n/ai pehle tour of heroes kar warna search bar nahi hoga
//kk
// Chal bye
//thanks alot