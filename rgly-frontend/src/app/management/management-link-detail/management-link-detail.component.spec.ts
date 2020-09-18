import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementLinkDetailComponent } from './management-link-detail.component';

describe('ManagementLinkDetailComponent', () => {
  let component: ManagementLinkDetailComponent;
  let fixture: ComponentFixture<ManagementLinkDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementLinkDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementLinkDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
