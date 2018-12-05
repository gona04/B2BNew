import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerListGeneralComponent } from './engineer-list-general.component';

describe('EngineerListGeneralComponent', () => {
  let component: EngineerListGeneralComponent;
  let fixture: ComponentFixture<EngineerListGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngineerListGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineerListGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
