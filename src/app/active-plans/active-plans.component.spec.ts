import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePlansComponent } from './active-plans.component';

describe('ActivePlansComponent', () => {
  let component: ActivePlansComponent;
  let fixture: ComponentFixture<ActivePlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivePlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
