// @ts-nocheck
/* eslint-disable */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Grid84Component } from './grid-8-4.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('Grid84Component', (): void => {
  let component: Grid84Component;
  let fixture: ComponentFixture<Grid84Component>;
  let innerWidthSpy: jasmine.Spy;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [Grid84Component],
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(Grid84Component);
    component = fixture.componentInstance;
    innerWidthSpy = spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1024);
    fixture.detectChanges();
  });

  afterEach((): void => {
    innerWidthSpy.and.callThrough();
  });

  it('should update isBreakpointReached to true on small window size', (): void => {
    innerWidthSpy.and.returnValue(400);
    component.breakpoint = 500;
    component.onResize();
    fixture.detectChanges();
    expect(component.isBreakpointReached()).toBeTrue();
  });

  it('should update isBreakpointReached to false on large window size', (): void => {
    innerWidthSpy.and.returnValue(800);
    component.breakpoint = 500;
    component.onResize();
    fixture.detectChanges();
    expect(component.isBreakpointReached()).toBeFalse();
  });

  it('should apply "breakpoint-reached" class when isBreakpointReached is true', (): void => {
    innerWidthSpy.and.returnValue(400);
    component.breakpoint = 500;
    component.onResize();
    fixture.detectChanges();
    const container: DebugElement = fixture.debugElement.query(By.css('.container'));
    expect(container.classes['breakpoint-reached']).toBeTruthy();
  });

  it('should not apply "breakpoint-reached" class when isBreakpointReached is false', (): void => {
    innerWidthSpy.and.returnValue(800);
    component.breakpoint = 500;
    component.onResize();
    fixture.detectChanges();
    const container: DebugElement = fixture.debugElement.query(By.css('.container'));
    expect(container.classes['breakpoint-reached']).toBeFalsy();
  });
});
