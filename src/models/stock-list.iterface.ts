import { RadioButton } from "ionic-angular/umd";

export interface StockList {
  key?: string;
  itemName: string;
  itemColour: string;
  itemSize: string;
  itemQuantity: string;
  radioItem: RadioButton;
}
