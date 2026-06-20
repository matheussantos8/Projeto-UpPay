import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjudaHomePage } from './ajuda-home.page';

describe('AjudaHomePage', () => {
  let component: AjudaHomePage;
  let fixture: ComponentFixture<AjudaHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AjudaHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
