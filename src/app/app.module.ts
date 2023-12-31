import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { RecuperacionCodeComponent } from './pages/recuperacionCode/recuperacionCode.component'
import { notFoundComponent } from './pages/notFound/notFound.component';



// Componentes

import { ProductoDialogContent } from './components/producto-dialog-content/producto-dialog-content';
import { CategoryDialogContent } from './components/category-dialog-content/category-dialog-content';
import { SalesDialogContent } from './components/sales-dialog-content/sales-dialog-content';



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
import { MatPaginatorModule } from '@angular/material/paginator';
import { QuillModule } from 'ngx-quill'
import { editorHTMLComponent } from './pages/editorHTML/editorHTML.component';


import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

import { RecuperacionComponent } from './pages/recuperacion/recuperacion.component';
import { RecuperacionKeyComponent } from './pages/recuperacionKey/recuperacionKey.component'
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AboutComponent } from './pages/about/about.component';

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
    SalesDialogContent,
    ContactanosComponent,
    RecuperacionComponent,
    RecuperacionCodeComponent,
    RecuperacionKeyComponent,
    notFoundComponent,
    AboutComponent,
    editorHTMLComponent,
    PerfilComponent,
    VerifyComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
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
    MatPaginatorModule,
    MatProgressSpinnerModule,
    QuillModule.forRoot({
      modules: {
        syntax: false,
        toolbar: [['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'],                                         // remove formatting button
        ['link', 'image', 'video'] ]
      }
    }),
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
