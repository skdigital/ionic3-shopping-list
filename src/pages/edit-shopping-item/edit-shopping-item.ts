import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// DB realtime cloud db library for interacting with Firebase2
import { AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
// Interfaces, contracts and models
import { ShoppingItem } from './../../models/shopping-item/shopping-item.interface';
import { Subscription } from "rxjs/subscription";

@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  ShoppingItemSubscription: Subscription;
  shoppingItemRef$: FirebaseObjectObservable<ShoppingItem>;
  shoppingItem = {} as ShoppingItem;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private db: AngularFireDatabase) {
    
    // Capture the shopppingItemId as a NavParameter
    const shoppingItemId = this.navParams.get('shoppingItemId');

    // Log out the navparam, in this case our shoppingItemId from firebase
    console.log(shoppingItemId);
    
    // Set the scope of our firebase object equal to our NavParams or our selected Item
    this.shoppingItemRef$ = this.db.object(`shopping-list/${shoppingItemId}`);
    
    // Subscribe to the Object in firebase and then assign the result to this.shopping item.
    this.ShoppingItemSubscription =
    this.shoppingItemRef$.subscribe(res => this.shoppingItem = res)
  }

  editShoppingItem(shoppingItem: ShoppingItem) {
    //update our firebase node with the new item data
    this.shoppingItemRef$.update(shoppingItem);
    // send the user back to the ShoppingListPage by poping the current edit page off the nav stack.
    this.navCtrl.pop();
  }

  ionViewWillLeave() {
    // Unsubscribed from Observable when leaving the page.
    this.ShoppingItemSubscription.unsubscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditShoppingItemPage');
  }

}
