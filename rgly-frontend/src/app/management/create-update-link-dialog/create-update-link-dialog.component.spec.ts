import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateLinkDialogComponent } from './create-update-link-dialog.component';

describe('CreateUpdateLinkDialogComponent', () => {
  let component: CreateUpdateLinkDialogComponent;
  let fixture: ComponentFixture<CreateUpdateLinkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateLinkDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateLinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
