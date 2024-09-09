import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'sc-grid-8-4',
  standalone: true,
  imports: [NgClass],
  templateUrl: './grid-8-4.component.html',
  styleUrl: './grid-8-4.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Grid84Component implements OnChanges, OnInit {
  @Input() public breakpoint!: number;
  @Input() public gap: number = 0;

  protected isBreakpointReached: WritableSignal<boolean> = signal(false);

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['breakpoint']) {
      this.updateView();
    }
  }

  public ngOnInit(): void {
    this.updateView();
  }

  protected updateView(): void {
    if (this.breakpoint !== null) {
      this.isBreakpointReached.set(window.innerWidth <= this.breakpoint);
      return;
    }

    this.isBreakpointReached.set(false);
  }

  @HostListener('window:resize')
  protected onResize(): void {
    this.updateView();
  }
}
