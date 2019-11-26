import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParserOutput } from './parser-output';

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  private worker: Worker;
  public data$: Observable<ParserOutput>;

  constructor() {
    this.worker = new Worker('./parser.worker', { type: 'module' });
    this.data$ = fromEvent<MessageEvent>(this.worker, 'message')
      .pipe(map(({ data }) => data));
  }

  next(value: string) {
    this.worker.postMessage(value);
  }
}
