import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedEmployeesListComponent } from './deleted-employees-list.component';

describe('DeletedEmployeesListComponent', () => {
  let component: DeletedEmployeesListComponent;
  let fixture: ComponentFixture<DeletedEmployeesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedEmployeesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedEmployeesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
