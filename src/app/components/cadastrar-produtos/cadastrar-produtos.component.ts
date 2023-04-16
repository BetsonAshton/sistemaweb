import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.css']
})
export class CadastrarProdutosComponent {


  mensagem: string = '';
  categorias: any[] = [];


  httpHeaders: HttpHeaders = new HttpHeaders();


  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) {
    //capturando o token do usuário autenticado
    if (localStorage.getItem('dados-usuario') != null) {
      var dados = JSON.parse(localStorage.getItem('dados-usuario')  as string);
      this.httpHeaders = new HttpHeaders({
        'Authorization': `Bearer ${dados.token}`
      })
    }


    this.spinner.show();


    this.httpClient.get(
      environment.apiProdutos + "api/categorias",
      { headers: this.httpHeaders } //enviando o token..
    )
      .subscribe({
        next: (data) => {
          this.categorias = data as any[];
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


  //objeto para capturar o formulário
  formCadastro = new FormGroup({
    nome: new FormControl('',
      [Validators.required, Validators.minLength(8), 
       Validators.maxLength(50)]),
    descricao: new FormControl('',
      [Validators.required, Validators.minLength(8), 
       Validators.maxLength(150)]),
    preco: new FormControl('',
      [Validators.required]),
    quantidade: new FormControl('',
      [Validators.required]),
    idCategoria: new FormControl('',
      [Validators.required])
  });


  //objeto para executar as validações dos csmpos
  get form(): any {
    return this.formCadastro.controls;
  }


  //função para submit para processar o formulário
  onSubmit(): void {
    this.spinner.show();
    this.httpClient.post(
      environment.apiProdutos + "api/produtos",
      this.formCadastro.value,
      { headers: this.httpHeaders } //enviando o token..
    )
      .subscribe({
        next: (data: any) => {
          this.mensagem = data.mensagem;
          this.formCadastro.reset();
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
