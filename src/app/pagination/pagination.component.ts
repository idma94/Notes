import {Component, EventEmitter, forwardRef, Inject, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {NoteListComponent} from "../note-list/note-list.component";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {

  @Input() total = 0;
  @Input() page = 1;
  @Input() perPage = 13;
  @Input() pageRange = 2;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.perPage) {
      if (changes.perPage.previousValue !== changes.perPage.currentValue) {
        console.log('change perPge');
        this.pageChanged.emit(this.page);
      }
    }
  }

  get totalPages() {
    return Math.ceil(this.total / this.perPage);
  }

  get nextPage() {
    return this.page + 1;
  }

  get pervPage() {
    return this.page - 1;
  }

  get hasNext() {
    return this.page < this.totalPages;
  }

  get hasPrev() {
    return this.page > 1;
  }

  get rangeStart() {
    const start = this.page - this.pageRange;
    return start > 0 ? start : 1;
  }

  get rangeEnd() {
    const end = this.page + this.pageRange;
    return end < this.totalPages ? end : this.totalPages;
  }

  get pages() {
    const pages = [];
    for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
      pages.push(i);
    }
    return pages;
  }

  pageChange(page: number): void {
    this.pageChanged.emit(page);
  }

}
