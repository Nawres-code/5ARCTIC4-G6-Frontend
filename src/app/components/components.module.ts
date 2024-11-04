import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { ChangepwdComponent } from './changepwd/changepwd.component';
import { ForgetPwdComponent } from './forget-pwd/forget-pwd.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    ToastrModule.forRoot() ,
    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ChangepwdComponent,
    ForgetPwdComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
