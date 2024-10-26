import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubscribeComponent } from 'src/app/pages/subscribe/subscribe.component';
import { GetallsubscriptionComponent } from 'src/app/pages/getallsubscription/getallsubscription.component';
import { SubscribeHistoryComponent } from 'src/app/pages/subscribe-history/subscribe-history.component';
//import { SubscribeComponent } from 'src/app/pages/subscribe/subscribe.component';
//import { AbonnementComponent } from 'src/app/pages/abonnement/abonnement.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    MapsComponent,
    SubscribeComponent,
    GetallsubscriptionComponent,
    SubscribeHistoryComponent
    
  ]
})

export class AdminLayoutModule {}
