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
  selector: 'sc-grid-4-8',
  standalone: true,
  templateUrl: './grid-4-8.component.html',
  styleUrl: './grid-4-8.component.scss',
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Grid48Component implements OnChanges, OnInit {
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
