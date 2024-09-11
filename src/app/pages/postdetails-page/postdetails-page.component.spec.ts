import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostdetailsPageComponent } from './postdetails-page.component';

describe('PostdetailsPageComponent', () => {
  let component: PostdetailsPageComponent;
  let fixture: ComponentFixture<PostdetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostdetailsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostdetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
