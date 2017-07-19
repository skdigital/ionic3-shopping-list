import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// DB AND HOSTING - firebase imports for online backend as a service/hosting
import { AngularFireModule } from "angularfire2";
import { FIREBASE_CREDENTIALS } from "./firebase.creds";
import { AngularFireDatabaseModule } from "angularfire2/database";
// App specific imports, pages, components etc..
import { MyApp } from './app.component';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { AddShoppingPage } from '../pages/add-shopping/add-shopping';
import { EditShoppingItemPage } from "../pages/edit-shopping-item/edit-shopping-item";

@NgModule({
  declarations: [
    MyApp,
    ShoppingListPage,
    AddShoppingPage,
    EditShoppingItemPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // initialise AngularFire with credentials from the dashboard.
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    //import the AngularFireDatabaseModule in order to interact with the cloud realtime database.
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShoppingListPage,
    AddShoppingPage,
    EditShoppingItemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
