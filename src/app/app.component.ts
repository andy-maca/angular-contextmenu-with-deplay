import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Right click on the black rectangle to show context menu';
  show = false;
  loaded = false;
  private timerId;

  @HostListener('window:click', ['$event'])
  onclick(e: MouseEvent) {
    if (e.target !== this.menuElement.nativeElement) {
      this.show = false;
    }
  }

  @ViewChild('contextMenu', { static: false })
  menuElement: ElementRef<HTMLElement>;

  showMenu(e: MouseEvent, delay) {
    e.preventDefault();
    e.stopPropagation();
    this.show = true;

    this.menuElement.nativeElement.style.left = e.pageX + 'px';
    this.menuElement.nativeElement.style.top = e.pageY + 'px';
    clearTimeout(this.timerId);

    this.loaded = false;
    this.timerId = setTimeout(() => {
      this.loaded = true;
    }, delay);
    return false;
  }
}
