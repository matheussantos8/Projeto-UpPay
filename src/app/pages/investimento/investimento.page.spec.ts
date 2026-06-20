import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvestimentoPage } from './investimento.page';

describe('InvestimentoPage', () => {
  let component: InvestimentoPage;
  let fixture: ComponentFixture<InvestimentoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestimentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
