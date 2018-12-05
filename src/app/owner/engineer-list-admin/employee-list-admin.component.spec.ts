import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerListAdminComponent } from './engineer-list-admin.component';

describe('EngineerListAdminComponent', () => {
  let component: EngineerListAdminComponent;
  let fixture: ComponentFixture<EngineerListAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngineerListAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineerListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
