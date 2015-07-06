import {bindable, inject} from 'aurelia-framework';

@inject(Element)
export class MyElement {
  @bindable data

  constructor(element) {
    this.element = element;
  }

  attached() {
    console.log('attached called!');

    // this.element
    //   .insertAdjacentHTML('afterbegin', '<li>data: ${data}</li>');
  }
}
