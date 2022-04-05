import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBreadcrumbComponent } from './home-breadcrumb.component';

describe('HomeBreadcrumbComponent', () => {
  let component: HomeBreadcrumbComponent;
  let fixture: ComponentFixture<HomeBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBreadcrumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
