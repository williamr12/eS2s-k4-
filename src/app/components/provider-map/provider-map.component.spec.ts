import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderMapComponent } from './provider-map.component';

describe('ProviderMapComponent', () => {
  let component: ProviderMapComponent;
  let fixture: ComponentFixture<ProviderMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderMapComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
