import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSignupFormComponent } from './user-signup-form.component';

describe('UserSignupFormComponent', () => {
  let component: UserSignupFormComponent;
  let fixture: ComponentFixture<UserSignupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSignupFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
