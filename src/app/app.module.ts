import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AlertContent } from './components/alert-dialog-content/alert-dialog-content';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { OneProductComponent } from './pages/oneproduct/oneproduct.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { AdminComponent } from './pages/admin/admin.component';

// Componentes

import { ProductoDialogContent } from './components/producto-dialog-content/producto-dialog-content';
import { CategoryDialogContent } from './components/category-dialog-content/category-dialog-content';


// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ColorChromeModule } from 'ngx-color/chrome'; // <color-chrome></color-chrome>

import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AlertContent,
    CarritoComponent,
    RegistroComponent,
    OneProductComponent,
    CategoriaComponent,
    ProductoDialogContent,
    CategoryDialogContent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ColorChromeModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
