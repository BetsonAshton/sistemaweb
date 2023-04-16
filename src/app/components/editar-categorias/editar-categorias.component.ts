import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-editar-categorias',
  templateUrl: './editar-categorias.component.html',
  styleUrls: ['./editar-categorias.component.css']
})
export class EditarCategoriasComponent {


  mensagem: string = '';
  httpHeaders: HttpHeaders = new HttpHeaders();


  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute
  ) {
    //capturando o token do usuário autenticado
    if (localStorage.getItem('dados-usuario') != null) {
      var dados = JSON.parse(localStorage.getItem
                 ('dados-usuario') as string);
      this.httpHeaders = new HttpHeaders({
        'Authorization': `Bearer ${dados.token}`
      })
    }


    let id = this.activatedRoute.snapshot.paramMap.get('id') as string;


    this.spinner.show();


    this.httpClient.get(
      environment.apiProdutos + "api/categorias/" + id,
      { headers: this.httpHeaders } //enviando o token..
    )
      .subscribe({
        next: (data: any) => {
          this.formEdicao.patchValue(data);
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
    idCategoria: new FormControl('', []),
    nome: new FormControl('',
      [Validators.required, Validators.minLength(8),
       Validators.maxLength(50)]),
    descricao: new FormControl('',
      [Validators.required, Validators.minLength(8), 
       Validators.maxLength(150)])
  });


  //objeto para executar as validações dos csmpos
  get form(): any {
    return this.formEdicao.controls;
  }


  //função para submit para processar o formulário
  onSubmit(): void {


    this.spinner.show();


    this.httpClient.put(
      environment.apiProdutos + "api/categorias",
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
