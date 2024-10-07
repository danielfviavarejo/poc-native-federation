import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstCatalogComponent } from './first-catalog.component';

describe('FirstCatalogComponent', () => {
  let component: FirstCatalogComponent;
  let fixture: ComponentFixture<FirstCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstCatalogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
