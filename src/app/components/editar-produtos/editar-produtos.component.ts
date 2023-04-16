import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-editar-produtos',
  templateUrl: './editar-produtos.component.html',
  styleUrls: ['./editar-produtos.component.css']
})
export class EditarProdutosComponent {


  mensagem: string = '';
  httpHeaders: HttpHeaders = new HttpHeaders();
  categorias: any[] = [];


  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute
  ) {
    //capturando o token do usuário autenticado
    if (localStorage.getItem('dados-usuario') != null) {
      var dados = JSON.parse(localStorage.getItem('dados-usuario') as string);
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


    let id = this.activatedRoute.snapshot.paramMap.get('id') as string;


    this.httpClient.get(
      environment.apiProdutos + "api/produtos/" + id,
      { headers: this.httpHeaders } //enviando o token..
    )
      .subscribe({
        next: (data: any) => {
          this.formEdicao.patchValue(data);
          this.formEdicao.controls['idCategoria'].setValue
                     (data.categoria.idCategoria);
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
  formEdicao = new FormGroup({
    idProduto: new FormControl('', []),
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
    return this.formEdicao.controls;
  }


  //função para submit para processar o formulário
  onSubmit(): void {


    this.spinner.show();


    this.httpClient.put(
      environment.apiProdutos + "api/produtos",
      this.formEdicao.value,
      { headers: this.httpHeaders } //enviando o token..
    )
      .subscribe({
        next: (data: any) => {
          this.mensagem = data.mensagem;
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
