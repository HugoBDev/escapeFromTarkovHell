import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HideoutStationItemComponent } from './hideout-station-item.component';

describe('HideoutStationItemComponent', () => {
  let component: HideoutStationItemComponent;
  let fixture: ComponentFixture<HideoutStationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HideoutStationItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HideoutStationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
