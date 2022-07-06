import {
  Component,
  ElementRef,
  HostListener,
  VERSION,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Right click on the black rectangle to show context menu';
  show = false;
  delayStarted = false;
  private timerId;

  @HostListener('window:click', ['$event'])
  onclick(e: MouseEvent) {
    if (e.target !== this.menuElement.nativeElement) {
      this.show = false;
    }
  }

  @ViewChild('contextMenu', { static: true })
  menuElement: ElementRef<HTMLElement>;

  showMenu(e: MouseEvent, delay) {
    this.show = false;
    e.preventDefault();
    this.menuElement.nativeElement.style.left = e.pageX + 'px';
    this.menuElement.nativeElement.style.top = e.pageY + 'px';
    clearTimeout(this.timerId);

    this.delayStarted = true;
    this.timerId = setTimeout(() => {
      this.show = true;
      this.delayStarted = false;
    }, delay);
  }
}
