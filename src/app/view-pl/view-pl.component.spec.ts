import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlComponent } from './view-pl.component';

describe('ViewPlComponent', () => {
  let component: ViewPlComponent;
  let fixture: ComponentFixture<ViewPlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
