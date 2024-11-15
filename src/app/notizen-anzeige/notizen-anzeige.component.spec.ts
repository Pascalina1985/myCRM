import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotizenAnzeigeComponent } from './notizen-anzeige.component';

describe('NotizenAnzeigeComponent', () => {
  let component: NotizenAnzeigeComponent;
  let fixture: ComponentFixture<NotizenAnzeigeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotizenAnzeigeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotizenAnzeigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
