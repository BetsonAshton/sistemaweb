import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})


export class RecuperarSenhaComponent {


  //atributos
  mensagem: string = '';


  //construtor
  constructor(
    private httpClient: HttpClient, //injeção de dependência
    private spinner: NgxSpinnerService //injeção de dependência
  ) {
  }


  //objeto para capturar o formulário
  formRecuperarSenha = new FormGroup({
    email: new FormControl('',
      [Validators.required, Validators.email]),
  });


  //objeto para executar as validações dos csmpos
  get form(): any {
    return this.formRecuperarSenha.controls;
  }


  //função para capturar o SUBMIT do formulário
  onSubmit(): void {

    this.spinner.show();

    this.httpClient.post(
      environment.apiUsuarios + "api/RecuperarSenha",
      this.formRecuperarSenha.value
    )
    .subscribe({
      next: (data: any) => {
        this.mensagem = data.mensagem;
        this.formRecuperarSenha.reset();
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
