import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePosteComponent } from './update-poste.component';

describe('UpdatePosteComponent', () => {
  let component: UpdatePosteComponent;
  let fixture: ComponentFixture<UpdatePosteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePosteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
