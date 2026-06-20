import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceberPagamentoPage } from './receber-pagamento.page';

describe('ReceberPagamentoPage', () => {
  let component: ReceberPagamentoPage;
  let fixture: ComponentFixture<ReceberPagamentoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceberPagamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
