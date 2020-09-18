import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkListItemComponent } from './link-list-item.component';

describe('LinkListItemComponent', () => {
  let component: LinkListItemComponent;
  let fixture: ComponentFixture<LinkListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
