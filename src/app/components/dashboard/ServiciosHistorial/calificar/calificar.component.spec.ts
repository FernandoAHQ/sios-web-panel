import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';

import { CalificarComponent } from './calificar.component';

describe('CalificarComponent', () => {
  let component: CalificarComponent;
  let fixture: ComponentFixture<CalificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDividerModule],
      declarations: [ CalificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
