import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbtestComponent } from './dbtest.component';

describe('DbtestComponent', () => {
  let component: DbtestComponent;
  let fixture: ComponentFixture<DbtestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DbtestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DbtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
