import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePizzaDetailsComponent } from './update-pizza-details.component';

describe('UpdatePizzaDetailsComponent', () => {
  let component: UpdatePizzaDetailsComponent;
  let fixture: ComponentFixture<UpdatePizzaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePizzaDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePizzaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
