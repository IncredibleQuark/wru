import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCComponent } from './map-c.component';

describe('MapCComponent', () => {
  let component: MapCComponent;
  let fixture: ComponentFixture<MapCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
