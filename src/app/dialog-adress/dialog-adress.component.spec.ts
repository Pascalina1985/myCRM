import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdressComponent } from './dialog-adress.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('DialogAdressComponent', () => {
  let component: DialogAdressComponent;
  let fixture: ComponentFixture<DialogAdressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAdressComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}, // Ein leerer Mock für MatDialogRef
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}, // Mock-Daten für den Dialog
        },
      ],
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
