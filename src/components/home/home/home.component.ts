import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogData, ExistingTemplate } from 'src/app/model/core.model';
import { DialogHomeComponent } from 'src/components/dialog-greeting-form/home/home.component';
import { localStorageKey, storage } from 'src/utils/core.util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  styles = [0, 1, 2, 3, 4];
  defaultClass = 'template-0';

  get defaultPlaceholderData(): DialogData {
    return JSON.parse(
      JSON.stringify({
        heading: '',
        discount: '',
      })
    );
  }

  data: DialogData = this.defaultPlaceholderData;

  existingKey!: string | number;

  newKey = new Date().getTime();

  storage = storage();

  constructor(
    public dialog: MatDialog,
    private cdf: ChangeDetectorRef,
    public acr: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.acr.params.subscribe((p) => {
      const { id } = p;

      if (id) {
        const template = this.storage.find((item) => item.key == id);
        if (!template) return;
        this.existingKey = template.key;
        this.data = template?.data || this.defaultPlaceholderData;
        this.defaultClass = template.css;
        console.log(this.data, template);
      }
      this.showDialog();
    });
  }

  private showDialog() {
    console.log(this.data);
    const dialogRef = this.dialog.open(DialogHomeComponent, {
      width: '550px',
      data: this.data || this.defaultPlaceholderData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.data = result;
      this.cdf.detectChanges();
    });
  }

  applyClass(index: number) {
    this.defaultClass = `template-${index}`;
  }

  save() {
    if (this.data.heading === '' || this.data.discount === '') {
      return alert('Please add heading and discount before save, thanks!');
    }
    const existinStorage = this.storage.map((item) => item);

    if (this.existingKey) {
      const index = existinStorage.findIndex(
        (item) => item.key == this.existingKey
      );
      if (index === -1) return; // false alaram
      const existingData = existinStorage[index];
      existingData.data = this.data;
      existingData.css = this.defaultClass;
      existinStorage[index] = existingData;
    } else {
      existinStorage.push({
        key: this.newKey,
        css: this.defaultClass,
        data: this.data,
      });
    }
    localStorage.setItem(localStorageKey, JSON.stringify(existinStorage));
    this.router.navigate(['posts']);
  }

  edit() {
    this.showDialog();
  }
}
