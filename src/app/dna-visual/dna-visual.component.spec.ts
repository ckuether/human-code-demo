import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DnaVisualComponent } from './dna-visual.component';

describe('DnaVisualComponent', () => {
  let component: DnaVisualComponent;
  let fixture: ComponentFixture<DnaVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DnaVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DnaVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
