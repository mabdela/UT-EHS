import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/main/home/home';
import { AboutPage } from '../pages/main/about/about';
import { ContactPage } from '../pages/main/contact/contact';
import {ScannerPage} from '../pages/scanner/QRscanner/scanner';
import {ActivityPage} from '../pages/activity/activity';
import { Page1 } from '../pages/activity/subpages/page1/page1';
import { Page2 } from '../pages/activity/subpages/page2/page2';
import { TabsPage } from '../pages/main/tabs/tabs';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'e17dd2dc'
  },
  'push': {
    'sender_id': '826355237077',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    ContactPage,
    ScannerPage,
    ActivityPage,
    Page1,
    Page2,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
	CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    ContactPage,
    ScannerPage,
    ActivityPage,
    Page1,
    Page2,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}


