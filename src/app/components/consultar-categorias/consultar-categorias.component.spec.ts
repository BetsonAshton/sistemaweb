import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarCategoriasComponent } from './consultar-categorias.component';

describe('ConsultarCategoriasComponent', () => {
  let component: ConsultarCategoriasComponent;
  let fixture: ComponentFixture<ConsultarCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarCategoriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
