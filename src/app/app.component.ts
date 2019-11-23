import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import './prog-lin.ace.mod';
import 'ace-builds/src-noconflict/theme-monokai';
import { edit } from 'ace-builds';

const THEME = 'ace/theme/monokai';
const MODE = 'ace/mode/progLin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('editor', { static: true }) editor!: ElementRef<HTMLDivElement>;

  ngOnInit() {
    const inputEditor = edit(this.editor.nativeElement);
    inputEditor.setTheme(THEME);
    inputEditor.getSession().setMode(MODE);
  }
}
