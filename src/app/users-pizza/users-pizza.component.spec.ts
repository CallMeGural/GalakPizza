import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPizzaComponent } from './users-pizza.component';

describe('UsersPizzaComponent', () => {
  let component: UsersPizzaComponent;
  let fixture: ComponentFixture<UsersPizzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersPizzaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
