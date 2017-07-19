import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Firebase realtime cloud database import for interacting with our DB
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

// Interfaces, models and contracts
import { ShoppingItem } from "../../models/shopping-item/shopping-item.interface";

@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  // Creating a new ShoppingItem Object
  shoppingItem = {} as ShoppingItem
  // store a reference to our database of type observable ShoppingItem[] Array
  ShoppingItemRef$: FirebaseListObservable<ShoppingItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {

     this.ShoppingItemRef$ = this.db.list('shopping-list')

     /* 
        shopping-list:
          0:  
            itemName: 'Pizza',
            itemNumber: 1
          1:
            itemName: 'Cheesecake',
            itemNumber: 5
     */
  }
  
  addShoppingItem(shoppingItem: ShoppingItem) {
    /* 
      Creates an anonymous object and converts itemNumber to a number.
      Push this to our Firebase database under the 'shopping-list' node.
    */
    this.ShoppingItemRef$.push({
      itemName: this.shoppingItem.itemName,
      itemNumber: Number(this.shoppingItem.itemNumber)
    });
    // Log results of shoppingItem onto the console
    console.log(shoppingItem);

    // Reset our ShoppingItem
    this.shoppingItem = {} as ShoppingItem;

    // Navigate the user back to the shoppingList page
    this.navCtrl.pop();
  }

}