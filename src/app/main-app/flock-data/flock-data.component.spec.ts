import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlockDataComponent } from './flock-data.component';

describe('FlockDataComponent', () => {
  let component: FlockDataComponent;
  let fixture: ComponentFixture<FlockDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlockDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlockDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
