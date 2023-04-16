import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarCategoriasComponent } from './cadastrar-categorias.component';

describe('CadastrarCategoriasComponent', () => {
  let component: CadastrarCategoriasComponent;
  let fixture: ComponentFixture<CadastrarCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarCategoriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
