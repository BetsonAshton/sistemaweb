import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CriarContaComponent } from './components/criar-conta/criar-conta.component';
import { LoginComponent } from './components/login/login.component';
import { RecuperarSenhaComponent } from './components/recuperar-senha/recuperar-senha.component';
import { CadastrarCategoriasComponent } from './components/cadastrar-categorias/cadastrar-categorias.component';
import { ConsultarCategoriasComponent } from './components/consultar-categorias/consultar-categorias.component';
import { EditarCategoriasComponent } from './components/editar-categorias/editar-categorias.component';
import { CadastrarProdutosComponent } from './components/cadastrar-produtos/cadastrar-produtos.component';
import { ConsultarProdutosComponent } from './components/consultar-produtos/consultar-produtos.component';
import { EditarProdutosComponent } from './components/editar-produtos/editar-produtos.component';


//mapeamento das rotas do projeto
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'criar-conta', component: CriarContaComponent },
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },
  { path: 'cadastrar-categorias', component: CadastrarCategoriasComponent },
  { path: 'consultar-categorias', component: ConsultarCategoriasComponent },
  { path: 'editar-categorias/:id', component: EditarCategoriasComponent },
  { path: 'cadastrar-produtos', component: CadastrarProdutosComponent },
  { path: 'consultar-produtos', component: ConsultarProdutosComponent },
  { path: 'editar-produtos/:id', component: EditarProdutosComponent }

];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CriarContaComponent,
    LoginComponent,
    RecuperarSenhaComponent,
    CadastrarCategoriasComponent,
    ConsultarCategoriasComponent,
    EditarCategoriasComponent,
    CadastrarProdutosComponent,
    ConsultarProdutosComponent,
    EditarProdutosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), //registrando as rotas
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
