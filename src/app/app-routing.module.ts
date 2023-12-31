import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { OneProductComponent } from './pages/oneproduct/oneproduct.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { RecuperacionComponent } from './pages/recuperacion/recuperacion.component';
import { RecuperacionCodeComponent } from './pages/recuperacionCode/recuperacionCode.component'
import { RecuperacionKeyComponent } from './pages/recuperacionKey/recuperacionKey.component'
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AboutComponent } from './pages/about/about.component';
import { notFoundComponent } from './pages/notFound/notFound.component';
import { editorHTMLComponent } from './pages/editorHTML/editorHTML.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inicio',
  },
  {
    path: 'inicio',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent,
  },
  {
    path: 'contactanos',
    component: ContactanosComponent,
  },
  {
    path: 'carrito',
    component: CarritoComponent,
  },
  {
    path: 'producto/:id',
    component: OneProductComponent,
  },
  {
    path: 'categoria/:category/:subcategory',
    component: CategoriaComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'verify',
    component: VerifyComponent,
  },
  {
    path: 'recuperacion',
    component: RecuperacionComponent,
  },
  {
    path: 'recuperacion/code/:email',
    component: RecuperacionCodeComponent,
  },
  {
    path: 'recuperacion/key/:email/:key',
    component: RecuperacionKeyComponent,
  },
  {
    path: 'perfil',
    component: PerfilComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'html-editor',
    component: editorHTMLComponent,
  },
  { path: '**', pathMatch: 'full', component: notFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
