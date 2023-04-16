import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  //atributos
  mensagem: string = '';


  //construtor
  constructor(
    private httpClient: HttpClient, //injeção de dependência
    private spinner: NgxSpinnerService //injeção de dependência
  ) {
    /* verificar se o usuário já está autenticado */
    if(localStorage.getItem('dados-usuario') != null) {
      //redirecionar para a página de consulta de produtos
      window.location.href = '/consultar-produtos';
    }
  }


  //objeto para capturar o formulário
  formLogin = new FormGroup({
    email: new FormControl('',
      [Validators.required, Validators.email]),
    senha: new FormControl('',
      [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
  });


  //objeto para executar as validações dos csmpos
  get form(): any {
    return this.formLogin.controls;
  }


  //função para capturar o SUBMIT do formulário
  onSubmit(): void {


    this.spinner.show();


    this.httpClient.post(
      environment.apiUsuarios + "api/Login",
      this.formLogin.value
    )
      .subscribe({
        next: (data: any) => {
          //gravar os dados em uma local storage
          localStorage.setItem("dados-usuario", JSON.stringify(data));
          //redirecionar para a página:
          window.location.href = "/consultar-produtos";
        },
        error: (e) => {
          this.mensagem = e.error.mensagem;
        }
      })
      .add(
        () => {
          this.spinner.hide();
        }
      )


  }
}
