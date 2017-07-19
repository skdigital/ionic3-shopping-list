import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
// Firebase imports for interacting with the realtime cloud DB
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
// Page imports used for navigation
import { AddShoppingPage } from "../add-shopping/add-shopping";
import { EditShoppingItemPage } from './../edit-shopping-item/edit-shopping-item';
// Interfaces, models and contracts
import { ShoppingItem } from "../../models/shopping-item/shopping-item.interface";

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private db: AngularFireDatabase, 
    private actionSheetCtrl: ActionSheetController) {
    /* 
      Pointing the shoppingListRef$ -> 'shopping-list' node in firebase.
      That means not only can we push thins from the reference to the database, 
      but Also we have access to everything inside of that node.
    */
    this.shoppingListRef$ = this.db.list('shopping-list');
    //this.shoppingListRef$.subscribe(res => console.log(res));
  }

  /* Display an ActionSheet that gives the user the following options: 
    
      1. Edit the ShoppingItem
      2. Delete the ShoppingItem
      3. Cancel selection
  */
  selectShoppingItem(shoppingItem: ShoppingItem) {
    this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            // send the user to the editShoppingPage and pass the key as a parameter
            this.navCtrl.push(EditShoppingItemPage, 
              {shoppingItemId: shoppingItem.$key});
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            // delete the current shoppingItem, passed in via the parameter
            this.shoppingListRef$.remove(shoppingItem.$key)
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('The user has selected the cancel button');
          }
        }
      ]
    }).present();
  }

  // Navigation 
  navigateToAddShoppingPage ():void {
    this.navCtrl.push(AddShoppingPage)
  }

}
