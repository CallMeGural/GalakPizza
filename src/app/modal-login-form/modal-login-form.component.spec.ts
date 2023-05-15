import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLoginFormComponent } from './modal-login-form.component';

describe('ModalFormComponent', () => {
  let component: ModalLoginFormComponent;
  let fixture: ComponentFixture<ModalLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLoginFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
