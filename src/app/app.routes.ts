import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NotizenComponent } from './notizen/notizen.component';
import { NotizenAnzeigeComponent } from './notizen-anzeige/notizen-anzeige.component';
import { ArchivComponent } from './archiv/archiv.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user', component: UserComponent },
    { path: 'user-detail/:id', component: UserDetailComponent },
    { path: 'notizen/:userId', component: NotizenComponent },
    { path: 'notizen-anzeige/:userId', component: NotizenAnzeigeComponent },
    { path: 'archiv/:userId', component: ArchivComponent },
    { path: 'register', component: RegisterComponent },
];
