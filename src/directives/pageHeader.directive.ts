import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPageHeader]'
})
export class PageHeaderDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { 
    this.renderer.setStyle(this.el.nativeElement, 'color', '#ff9500')
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '28px')
    this.renderer.setStyle(this.el.nativeElement, 'padding', '1rem')
   }

}
