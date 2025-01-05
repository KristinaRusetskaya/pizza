import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CartService} from "../../../shared/services/cart.service";
import {from, map, Observable, Subject, Subscription} from "rxjs";
import * as bootstrap from "bootstrap";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PopupComponent} from "../../../shared/components/popup/popup.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit{

  // private observable: Observable<number>;
  private subscription: Subscription | null = null;
  private subject: Subject<number>;


  constructor(public cartService: CartService) {
    this.subject = new Subject<number>();
    let count: number = 0;
    const interval = setInterval(()=> {
      this.subject.next(count++);
    }, 1000)
    const timeout1 = setTimeout(()=> {
      this.subject.complete();
    }, 4000)



    // this.observable = new Observable((observer) => {
    //   let count: number = 0;
    //   const interval = setInterval(()=> {
    //     observer.next(count++);
    //   }, 1000)
    //   const timeout1 = setTimeout(()=> {
    //     observer.complete();
    //   }, 4000)
    //   const timeout2 = setTimeout(()=> {
    //     observer.error('world');
    //   }, 5000)
    //
    //   return {
    //     unsubscribe: ()=> {
    //       clearInterval(interval);
    //       clearTimeout(timeout1);
    //       clearTimeout(timeout2);
    //     }
    //   }
    // });

    // this.observable = from([1,2,3,4,5]);
  }
  ngOnInit() {
    // const myModalAlternative = new bootstrap.Modal('#myModal', {});
    // myModalAlternative.show();


    this.subscription = this.subject
      .pipe(
        map((number) => {
          return number * 10
        })
      )
      .subscribe({
      next: (param: number) => {
        console.log('subscriber 1: ' + param);
      },
      error: (error: string) => {
        console.log(error);
      }
    })
  }

  test() {
    this.subject.subscribe((param: number) => {
      console.log('subscriber 2: ' + param);
    })
  }

  @ViewChild(PopupComponent)
  private popupComponent!: PopupComponent;

  ngAfterViewInit() {
    this.popupComponent.open();
    // const modalRef = this.modalService.open(PopupComponent);
    // modalRef.componentInstance.data = 'World';
    // this.modalService.open(this.popup, {});
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
