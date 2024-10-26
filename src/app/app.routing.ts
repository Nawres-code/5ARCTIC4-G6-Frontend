import { NgModule } from '@angular/core';
import {  Routes } from '@angular/router';

import { RouterModule } from '@angular/router';

//import { SubscribeComponent } from './pages/subscribe/subscribe.component'; // Importez SubscribeComponent ici
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { GetallsubscriptionComponent } from './pages/getallsubscription/getallsubscription.component';
import { SubscribeComponent } from './pages/subscribe/subscribe.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgetPwdComponent } from './components/forget-pwd/forget-pwd.component';
import { TablesComponent } from './pages/tables/tables.component';
import { ChangepwdComponent } from './components/changepwd/changepwd.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsergetallComponent } from './pages/usergetall/usergetall.component';
import { AddCommentComponent } from './pages/add-comment/add-comment.component';
import { CommentsComponent } from './pages/comment/comments.component';
import { UpdatePosteComponent } from './pages/update-poste/update-poste.component';
import { UpdateCommentComponent } from './pages/update-comment/update-comment.component';
import { LoginLayoutComponent } from './components/LoginComponent/login-layout.component';
import { AuthGuard } from './Service/AuthGuard';
import { ErrorComponentComponent } from './pages/error-component/error-component.component';
import { AccesDeniedComponent } from './pages/acces-denied/acces-denied.component';
import { ReclamUserComponent } from './pages/reclam-user/reclam-user.component';
import { ReclamUserlistComponent } from './pages/reclam-userlist/reclam-userlist.component';
import { ReclamAdminComponent } from './pages/reclam-admin/reclam-admin.component';
import { FeedbackUserComponent } from './pages/feedback-user/feedback-user.component';
import { FeedbackAdminComponent } from './pages/feedback-admin/feedback-admin.component';
import { SubscribeHistoryComponent } from './pages/subscribe-history/subscribe-history.component';
//import { SubscribeComponent } from './pages/subscribe/subscribe.component';

const routes: Routes = [
  
  /************* comments and post routs *******************/
  {
    path: 'parking/poste/addPoste',
    component: UserProfileComponent,
    // Add AuthGuard here
    canActivate: [AuthGuard]
  },
  {
    path: 'parking/comment/addComment',
    component: AddCommentComponent,
    // Add AuthGuard here
    canActivate: [AuthGuard]
  },
  {
    path: 'comments',
    component: CommentsComponent,
    // Add AuthGuard here
    canActivate: [AuthGuard]
  },
  {
    path: 'add-comment',
    component: AddCommentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-comment/:id',
    component: AddCommentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update-poste/:id',
    component: UpdatePosteComponent,
    // Add AuthGuard here
    canActivate: [AuthGuard]
  },
  {
    path: 'update-comment/:id',
    component: UpdateCommentComponent,
    // Add AuthGuard here
    canActivate: [AuthGuard]
  },
  { 
    path: 'user-profile',   
    component: UserProfileComponent,
    // Add AuthGuard here
    canActivate: [AuthGuard]
  },
  {
    path: 'tables', 
    component: TablesComponent,
    // Add AuthGuard here
    canActivate: [AuthGuard]
  },
  /*************End  comments and post routs *******************/


  /************************** Dasboard *************************/
  

  {
    path: 'dashboard', 
    component: DashboardComponent,
    // Add AuthGuard here
    canActivate: [AuthGuard]
  },
  /************************** End Dasboard *************************/



    /************* Login , signup and user *******************/
    {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full'
    },
    {
      path: 'login', 
      component: LoginComponent,
      canActivate: [AuthGuard]
    },

  {
    path: 'register', 
    component: RegisterComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'forget-pwd', 
    component: ForgetPwdComponent
  },
  // {
  //   path: 'admin-dashbord', component: TablesComponent
  // },
  // {
  //   path: 'client-dashboard', component: DashboardComponent
  // },
  // {
  //   path: 'admin-users', component: TablesComponent
  // },
  {
    path: 'reset-password', 
    component: ChangepwdComponent
  },
  
  {
    path: 'users', 
    component: UsergetallComponent,
    // Add AuthGuard here
    canActivate: [AuthGuard]
  },
    /*************END Login , signup and user *******************/


    /************* Subscription routs *******************/
  { 
    path: 'getallsubscription', 
    component: GetallsubscriptionComponent,
    // Add AuthGuard here
    canActivate: [AuthGuard]
  },
  { 
    path: 'subscribe', 
    component: SubscribeComponent,
    // Add AuthGuard here
    canActivate: [AuthGuard]
  },
  { 
    path: 'subscriptionhistory', 
    component: SubscribeHistoryComponent,
    // Add AuthGuard here
    canActivate: [AuthGuard]
  },
    /**end subscription routes */



    //**start routes reclamation user  */
    { 
      path: 'reclamationUser', 
      component: ReclamUserComponent,
      // Add AuthGuard here
      canActivate: [AuthGuard]
    },
    
    { 
      path: 'reclamationListUser', 
      component: ReclamUserlistComponent,
      // Add AuthGuard here
      canActivate: [AuthGuard]
    },
    { 
      path: 'reclamationAdmin', 
      component: ReclamAdminComponent,
      // Add AuthGuard here
      canActivate: [AuthGuard]
    },
    { 
      path: 'feedbackUser', 
      component: FeedbackUserComponent,
      // Add AuthGuard here
      canActivate: [AuthGuard]
    },
    { 
      path: 'feedbackAdmin', 
      component: FeedbackAdminComponent,
      // Add AuthGuard here
      canActivate: [AuthGuard]
    },
    
    // Add a wildcard route for handling incorrect paths
  { path: 'AccesDenied' , component: AccesDeniedComponent },
  { path: 'error' , component: ErrorComponentComponent },
  { path: '**', redirectTo: '/error', pathMatch: 'full' }

];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    }),
    RouterModule // Add this line
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
