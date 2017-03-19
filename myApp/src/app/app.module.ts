import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/main/home/home';
import { AboutPage } from '../pages/main/about/about';
import { ContactPage } from '../pages/main/contact/contact';
import {ActivityPage} from '../pages/activity/activity';
import { NotificationPage } from '../pages/activity/subpages/notification/notification';
import { RefresherPage } from '../pages/activity/subpages/refresher/refresher';
import { LabPage } from '../pages/activity/subpages/lab/lab';
import { ChecklistPage } from '../pages/activity/subpages/checklist/checklist';
import { ReportAccidentPage } from '../pages/activity/subpages/reportaccident/reportaccident';
import { PastAccidentPage } from '../pages/activity/subpages/pastaccident/pastaccident';
import { EHSPage } from '../pages/activity/subpages/ehs/ehs';

import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login-page/login-page';
import { SignupPage } from '../pages/signup-page/signup-page';
import { Todos } from '../providers/todos';
import { Codes } from '../providers/codes';
import { Auth } from '../providers/auth';
import { TabsService } from '../providers/tabs.service';

import { FlashCardComponent } from '../components/flash-card/flash-card';
import { Data } from '../providers/data';
import { Past } from '../providers/past';

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
    ActivityPage,
    RefresherPage,
    NotificationPage,
    ChecklistPage,
    LabPage,
    ReportAccidentPage,
    PastAccidentPage,
    EHSPage,
    LoginPage,
    SignupPage,
    FlashCardComponent,
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
    ActivityPage,
    RefresherPage,
    NotificationPage,
    ChecklistPage,
    LabPage,
    ReportAccidentPage,
    PastAccidentPage,
    EHSPage,
    LoginPage,
    SignupPage,
    TabsPage
  ],
  providers: [Storage, Todos, Auth, TabsService, {provide: ErrorHandler, useClass: IonicErrorHandler}, Data, Past, Codes]
})
export class AppModule {}


