import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-consultar-produtos',
  templateUrl: './consultar-produtos.component.html',
  styleUrls: ['./consultar-produtos.component.css']
})
export class ConsultarProdutosComponent {


  mensagem: string = '';
  httpHeaders: HttpHeaders = new HttpHeaders();
  produtos: any[] = [];


  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) {
    //capturando o token do usuário autenticado




    if (localStorage.getItem('dados-usuario') != null) {
      var dados = JSON.parse(localStorage.getItem('dados-usuario') as string);
      this.httpHeaders = new HttpHeaders({
        'Authorization': `Bearer ${dados.token}`
      })
    }


    this.onInit();
  }


  onInit(): void {
    this.spinner.show();


    this.httpClient.get(
      environment.apiProdutos + "api/produtos",
      { headers: this.httpHeaders } //enviando o token..
    )
      .subscribe({
        next: (data) => {
          this.produtos = data as any[];
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


  onDelete(idProduto: string): void {


    if (window.confirm('Deseja excluir o produto?')) {
      this.spinner.show();


      this.httpClient.delete(
        environment.apiProdutos + "api/produtos/" + idProduto,
        { headers: this.httpHeaders } //enviando o token..
      )
        .subscribe({
          next: (data: any) => {
            this.mensagem = data.mensagem;
            this.onInit();
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
}
