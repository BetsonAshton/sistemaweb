import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent {


  //atributos
  mensagem: string = '';




  //construtor para injeção de dependência
  constructor(
    private httpClient: HttpClient, //inicialização automática
    private spinner: NgxSpinnerService //inicialização automática
  ) {
  }


  //objeto para capturar o formulário
  formCriarConta = new FormGroup({
    nome: new FormControl('',
      [Validators.required, Validators.minLength(8), 
       Validators.maxLength(150)]),
    email: new FormControl('',
      [Validators.required, Validators.email]),
    senha: new FormControl('',
      [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)])
  });


  //objeto para executar as validações dos csmpos
  get form(): any {
    return this.formCriarConta.controls;
  }


  //função para capturar o SUBMIT do formulário
  onSubmit(): void {


    this.spinner.show();


    //fazendo uma requisição POST para o endpoint /api/CriarConta
    this.httpClient.post(
      environment.apiUsuarios + "api/CriarConta",
      this.formCriarConta.value)
      .subscribe( //capturar o retorno da API
        {
          next: (data: any) => { //resposta de sucesso da API
            this.mensagem = data.mensagem;
            this.formCriarConta.reset();
          },
          error: (e) => { //resposta de erro da API
            this.mensagem = e.error.mensagem;
          }
        }
      ).add(
        () => {
          this.spinner.hide();
        }
      );
  }
}
