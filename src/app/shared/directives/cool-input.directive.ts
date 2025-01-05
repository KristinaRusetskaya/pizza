import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[coolInput]'
})
export class CoolInputDirective implements OnInit{

  @Input() coolInputDefaultBgColor: string = 'white';
  @Input() coolInputFocusBgColor: string = 'orange';

  constructor(private el: ElementRef, private rend: Renderer2) {
  }

  private _backgroundColor: string = '';
  @HostBinding('style.backgroundColor')
  get getBgColor() {
    return this._backgroundColor;
  }

  private _isFocus: boolean = false;
  @HostBinding('class.isOnFocus')
  get getIsOnFocus(): boolean {
    return this._isFocus;
  }
  @HostListener('focus')
  onFocus() {
    this.changeElementBgColor(this.coolInputFocusBgColor);
    this._isFocus = true;
  }
  @HostListener('blur')
  onBlur() {
    this.changeElementBgColor(this.coolInputDefaultBgColor);
    this._isFocus = false;
  }
  @HostListener('click', ['$event.target'])
  onClick(target: HTMLElement) {
    console.log(target);
  }

  ngOnInit() {
    this.changeElementBgColor(this.coolInputDefaultBgColor);
    this.rend.setAttribute(this.el.nativeElement, 'placeholder', this.el.nativeElement.getAttribute('placeholder') + '*');
    // const text = this.rend.createElement('span');
    // this.rend.setProperty(text, 'innerText', '*Обязательно для заполнения');
    // this.rend.setStyle(text, 'color', 'red');
    // this.rend.insertBefore(this.el.nativeElement.parentElement, text, this.rend.nextSibling(this.el.nativeElement));
  }

  changeElementBgColor(color: string) {
    this._backgroundColor = color;
    // this.rend.setStyle(this.el.nativeElement, 'background-color', color);
  }
}
