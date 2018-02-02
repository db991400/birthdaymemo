import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayDetailComponent } from './birthday-detail.component';

describe('BirthdayDetailComponent', () => {
  let component: BirthdayDetailComponent;
  let fixture: ComponentFixture<BirthdayDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthdayDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthdayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
