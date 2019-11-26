import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { edit, Ace } from 'ace-builds';
import { BehaviorSubject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { getSpinnerImageOnTime } from './spinner';
import { Network } from 'vis-network';

import './prog-lin.ace.mod';
import 'ace-builds/src-noconflict/theme-monokai';
import { ParserService } from './parser/parser.service';

import { branchAndBound } from './branch-and-bound';

const THEME = 'ace/theme/monokai';
const MODE = 'ace/mode/progLin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('editor', { static: true }) editor!: ElementRef<HTMLDivElement>;
  @ViewChild('graphDiv', { static: true }) graphDiv!: ElementRef<HTMLDivElement>;

  private network!: Network;
  private inputEditor!: Ace.Editor;
  private branchAndBoundSubscription!: Subscription;

  private error = new BehaviorSubject<string>('');

  error$ = this.error.asObservable();

  constructor(
    private parserService: ParserService
  ) {

  }

  ngOnInit() {
    const inputEditor = this.inputEditor = edit(this.editor.nativeElement);
    inputEditor.setTheme(THEME);
    inputEditor.getSession().setMode(MODE);

    inputEditor.addEventListener('change', (value: any) => {
      this.parserService.next(inputEditor.getValue());
    });

    inputEditor.setValue(`max (12a + 2b)
    st:
        b <= 4
        3a - 2b <= 3
        10a + 2b <= 23
        a >= 0
        b >= 0
`);
    inputEditor.clearSelection();

    this.network = new Network(this.graphDiv.nativeElement, {}, {
      physics: true,
      edges: {
        smooth: {
          enabled: true,
          type: 'cubicBezier',
          forceDirection: 'horizontal',
          roundness: .6
        },
        arrows: { to: true },
        font: {
          color: 'white',
          strokeColor: 'black'
        }
      },
      nodes: {
        image: getSpinnerImageOnTime(0),
        shape: 'circularImage',
        color: {
          background: 'white'
        },
        font: {
          size: 16
        }
      },
      layout: {
        hierarchical: {
          enabled: true,
          direction: 'UD',
          sortMethod: 'directed'
        }
      },
      interaction: {
        hover: true
      }
    });

    this.branchAndBoundSubscription = this.parserService.data$
      .pipe(switchMap(problem => branchAndBound(problem, this.network)))
      .subscribe(problem => {
        if (problem === null) {
          this.error.next('');
          inputEditor.getSession().clearAnnotations();
          // end
        } else if (problem.annotations) {
          inputEditor.getSession().setAnnotations(problem.annotations);
          this.error.next(problem.annotations[0].text);
          this.network.setData({});
        } else if (problem.error) {
          inputEditor.getSession().clearAnnotations();
          this.error.next(problem.error);
          this.network.setData({});
        }
      });
  }

  ngOnDestroy() {
    this.network.destroy();
    this.inputEditor.destroy();
    this.branchAndBoundSubscription.unsubscribe();
  }

}
