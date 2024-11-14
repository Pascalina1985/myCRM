import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdressComponent } from './dialog-adress.component';

describe('DialogAdressComponent', () => {
  let component: DialogAdressComponent;
  let fixture: ComponentFixture<DialogAdressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAdressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
