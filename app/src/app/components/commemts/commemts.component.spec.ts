import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommemtsComponent } from './commemts.component';

describe('CommemtsComponent', () => {
  let component: CommemtsComponent;
  let fixture: ComponentFixture<CommemtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommemtsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommemtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
