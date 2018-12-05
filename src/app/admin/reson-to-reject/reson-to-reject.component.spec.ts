import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResonToRejectComponent } from './reson-to-reject.component';

describe('ResonToRejectComponent', () => {
  let component: ResonToRejectComponent;
  let fixture: ComponentFixture<ResonToRejectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResonToRejectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResonToRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
