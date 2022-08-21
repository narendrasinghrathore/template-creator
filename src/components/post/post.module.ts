import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PostComponent,
  },
];

@NgModule({
  declarations: [PostComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [PostComponent],
})
export class PostModule {}
