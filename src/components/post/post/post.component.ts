import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { storage } from 'src/utils/core.util';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {
  get existingSavedTemplates() {
    return storage() || [];
  }

  constructor() {}

  ngOnInit(): void {}
}
