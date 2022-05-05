import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, DoCheck, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated // None, Native
})
export class ServerElementComponent implements 
OnInit, 
OnChanges, 
DoCheck, 
AfterContentInit, 
AfterContentChecked, 
AfterViewInit, 
AfterViewChecked, OnDestroy {
  @Input('srvElement') element: {
    type: string, name: string, content: string
  };
  @Input() name: string;
  constructor() { 
    console.log('constructor called!')
  }
  @ViewChild('heading') header: ElementRef;
  ngOnChanges(changes: SimpleChanges){
    console.log('ngOnChanges called!')
  }
  @ContentChild('contentParagraph') paragraph: ElementRef;

  ngOnInit() {
    console.log('ngOnInit called!');
    console.log('Text Content!' + this.header.nativeElement.textContent);
    console.log('Text Content of paragraph!' + this.paragraph.nativeElement.textContent);
  }
  ngDoCheck() {
      console.log('ngDoCheck called!')
  }
  ngAfterContentInit(){
    console.log('ngAfterContentInit called!')
  }
  ngAfterContentChecked(){
    console.log('ngAfterContentChecked called!')
    console.log('Text Content of paragraph!' + this.paragraph.nativeElement.textContent);
  }
  ngAfterViewInit(){
    console.log('ngAfterViewInit called!');
    console.log('Text Content!' + this.header.nativeElement.textContent);
  }
  ngAfterViewChecked(){
    console.log('ngAfterViewChecked called!')
  }
  ngOnDestroy() {
    console.log('ngOnDestroy called!')
  }

}
