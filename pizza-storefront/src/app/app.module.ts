import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { OrdersComponent } from './components/orders.component';
import { PizzaService } from './pizza.service';

const appRoutes: Routes = [
  {path: '', component:MainComponent},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
  
]

@NgModule({
  declarations: [
    AppComponent, 
    MainComponent, 
    OrdersComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, HttpClientModule, RouterModule
  ],

  providers: [ PizzaService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
