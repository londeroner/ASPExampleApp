import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {
  @Input() totalCount: number;
  @Input() pageSize: number;
  @Input() pageIndex: number;
  @Output() pageChanged = new EventEmitter<PageEvent>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onPagerChange(event?: PageEvent) {
    this.pageChanged.emit(event);
  }
}
