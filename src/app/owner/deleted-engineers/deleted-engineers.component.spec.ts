import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedEngineersComponent } from './deleted-engineers.component';

describe('DeletedEngineersComponent', () => {
  let component: DeletedEngineersComponent;
  let fixture: ComponentFixture<DeletedEngineersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedEngineersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedEngineersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
