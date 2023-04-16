import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProdutosComponent } from './editar-produtos.component';

describe('EditarProdutosComponent', () => {
  let component: EditarProdutosComponent;
  let fixture: ComponentFixture<EditarProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarProdutosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
