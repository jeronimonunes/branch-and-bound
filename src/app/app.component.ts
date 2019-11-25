import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Network, Node, DataSet } from 'vis';
import { edit, Ace } from 'ace-builds';
import { animationFrameScheduler, interval, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { getSpinnerImageOnTime } from './spinner';


import './prog-lin.ace.mod';
import 'ace-builds/src-noconflict/theme-monokai';
import { ParserService } from './parser/parser.service';
import { SimplexService } from './simplex/simplex.service';

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

  private error = new BehaviorSubject<string>('');

  error$ = this.error.asObservable();

  constructor(
    private simplexService: SimplexService,
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
        arrows: { to: true }
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
      }
    });

    // this.animationSubscription = interval(0, animationFrameScheduler).pipe(
    //   map(() => animationFrameScheduler.now()),
    //   map(getSpinnerImageOnTime)
    // ).subscribe(svg => {
    //   this.nodes.forEach(item => {
    //     (item as any).image = svg;
    //     this.nodes.update(item);
    //   });
    // });

    this.parserService.data$.subscribe(async value => {
      const nodes = new DataSet<Node>([{
        id: '1',
        label: 'Subproblem #1'
      }]);
      this.network.setData({ nodes });
      const animating = interval(0, animationFrameScheduler).pipe(
        map(() => animationFrameScheduler.now()),
        map(getSpinnerImageOnTime)
      ).subscribe(svg => {
        nodes.forEach(item => {
          (item as any).image = svg;
          nodes.update(item);
        });
      });
      try {
        if (value === null) {
          // Message to type something?
          this.network.setData({});
        } else if (value.annotations) {
          inputEditor.getSession().setAnnotations(value.annotations);
          this.error.next(value.annotations[0].text);
          this.network.setData({});
        } else if (value.error) {
          inputEditor.getSession().clearAnnotations();
          this.error.next(value.error);
          this.network.setData({});
        } else {
          this.error.next('');
          inputEditor.getSession().clearAnnotations();
          const res = await this.simplexService.evaluate(value).toPromise();
          switch (res.type) {
            case 'ILIMITED':
            case 'INFEASIBLE':
              nodes.update({
                id: '1',
                label: 'Subproblem #1\n' + res.type,
                shape: 'circle',
              });
              break;
            case 'LIMITED':
              const fracIdx = res.solution.findIndex(({ denominator }) => denominator !== '1');
              nodes.update({
                id: '1',
                label: 'Subproblem #1\n' +
                  (fracIdx !== -1 ? 'fractional' : 'integer') +
                  '\nvalue: ' + (+res.value.numerator / +res.value.denominator),
                shape: 'circle'
              });
              if (fracIdx !== -1) {
                // this.addSubproblems(nodes, value, 1);
              }
              break;
            default:
              never(res.type);
          }
        }
      } finally {
        animating.unsubscribe();
      }
    });
  }

  ngOnDestroy() {
    this.network.destroy();
    this.inputEditor.destroy();
  }

  addSubproblem() {

  }

}
