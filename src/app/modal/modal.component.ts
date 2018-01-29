import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  isActive = false;

  @Input() title: string;
  @Input() isValid = false;
  @Input() textOk = 'Сохранить';
  @Input() textCancel = 'Отмена';
  @Output() ok = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  openModal() {
    this.isActive = true;
  }

  closeModal() {
    this.isActive = false;
  }

  onSuccess() {
    this.ok.emit();
  }
}
