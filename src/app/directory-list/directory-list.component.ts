import { Component, OnInit } from '@angular/core';
import {ServerService} from '../shared/server.service';

@Component({
  selector: 'app-directory-list',
  templateUrl: './directory-list.component.html',
  styleUrls: ['./directory-list.component.css']
})
export class DirectoryListComponent implements OnInit {

  constructor(private server: ServerService) { }

  ngOnInit() {
    this.server.getDirectories().subscribe(data => {
      console.log(data);
    });
  }

}
