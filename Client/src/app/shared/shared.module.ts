import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { DragDropDirective } from './directives/drag-drop.directive';
import { PagerComponent } from './components/pager/pager.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [
    SidebarComponent,
    DragDropDirective,
    PagerComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule
  ],
  exports: [
    SidebarComponent,
    DragDropDirective,
    PagerComponent,
    SearchPipe
  ]
})
export class SharedModule { }
