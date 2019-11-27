import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatricialForm } from '../matricial-form';
import { Result } from 'src/native/simplex';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-view-pl',
  templateUrl: './view-pl.component.html',
  styleUrls: ['./view-pl.component.scss']
})
export class ViewPlComponent implements OnInit {

  mat: MatricialForm;
  res: Result;

  columns$: Observable<any>;
  tabloidStyle$: Observable<any>;

  constructor(@Inject(MAT_DIALOG_DATA) { mat, res }: { mat: MatricialForm, res: Result }) {
    this.mat = mat;
    this.res = res;
    console.log(mat, res);
    this.columns$ = of({
      'grid-template-columns': `repeat(${mat.C.length}, auto)`
    }).pipe(shareReplay(1));
    this.tabloidStyle$ = of({
      'grid-template-columns': `repeat(${res.state.C.length + res.state.certificate.length + 1}, auto)`
    }).pipe(shareReplay(1));
  }

  ngOnInit() {
  }

}
