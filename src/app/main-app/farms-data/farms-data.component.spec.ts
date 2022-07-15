import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmsDataComponent } from './farms-data.component';

describe('FarmsDataComponent', () => {
  let component: FarmsDataComponent;
  let fixture: ComponentFixture<FarmsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmsDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
