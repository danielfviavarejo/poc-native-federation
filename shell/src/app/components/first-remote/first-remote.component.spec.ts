import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstRemoteComponent } from './first-remote.component';

describe('FirstRemoteComponent', () => {
  let component: FirstRemoteComponent;
  let fixture: ComponentFixture<FirstRemoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstRemoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstRemoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
