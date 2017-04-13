import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataItemViewComponent } from './data-item-view.component';

describe('DataItemViewComponent', () => {
  let component: DataItemViewComponent;
  let fixture: ComponentFixture<DataItemViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataItemViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
