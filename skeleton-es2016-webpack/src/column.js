import {
  inject,
  bindable,
  noView,
  processContent
} from 'aurelia-framework';

@noView
@processContent(false)
@inject(Element)
export class Column {
  @bindable header
}
