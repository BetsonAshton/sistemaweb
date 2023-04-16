import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  //atributo para 'flegar' se o usuário está autenticado
  isLoggedIn: boolean = false;


  //atributos para capturar os dados do usuário autenticado
  nomeUsuario: string = '';
  emailUsuario: string = '';


  //método executado sempre que o componente abrir
  ngOnInit(): void {
    //verificar se existe um usuário autenticado
    if (localStorage.getItem('dados-usuario') != null) {
      var dados = JSON.parse(localStorage.getItem('dados-usuario') as string);
      this.nomeUsuario = dados.usuario.nome;
      this.emailUsuario = dados.usuario.email;
      this.isLoggedIn = true;
    }
  }


  //função para fazer o logout do usuário
  logout(): void {
    if (window.confirm('Deseja realmente sair do sistema?')) {
      //apagar os dados gravados na local storage
      localStorage.removeItem('dados-usuario');
      //redirecionar de volta para a página de login
      window.location.href = '/login';
    }
  }
}
