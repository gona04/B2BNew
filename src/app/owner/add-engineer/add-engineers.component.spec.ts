import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEngineersComponent } from './add-engineers.component';

describe('AddEngineerComponent', () => {
  let component: AddEngineersComponent;
  let fixture: ComponentFixture<AddEngineersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEngineersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEngineersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
