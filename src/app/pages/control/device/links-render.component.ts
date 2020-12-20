import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';


@Component({
    template: `
      <a type="button" (click)="onClickUse()" href="javascript:void(0)">use</a>
    `,
  })
  export class LinksRenderComponent implements ViewCell {
    constructor() {
    }

    renderValue: string;
    @Input() value: string;
    @Input() rowData: any;
    @Output() clicked = new EventEmitter();

    onClickUse() {
        this.clicked.emit(this.rowData);
    }
  }
