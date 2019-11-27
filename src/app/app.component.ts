import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { edit, Ace } from 'ace-builds';
import { BehaviorSubject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { getSpinnerImageOnTime } from './spinner';
import { Network, DataSet, Node, Edge } from 'vis-network';

import './prog-lin.ace.mod';
import 'ace-builds/src-noconflict/theme-monokai';

import { branchAndBound } from './branch-and-bound';
import { MatDialog } from '@angular/material/dialog';
import { createSolutionElement } from './util';
import { ViewPlComponent } from './view-pl/view-pl.component';
import { Result } from 'src/native/simplex';
import { MatricialForm } from './matricial-form';

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
  private nodes = new DataSet<Node>();
  private edges = new DataSet<Edge>();
  private inputEditor!: Ace.Editor;
  private branchAndBoundSubscription!: Subscription;

  private error = new BehaviorSubject<string>('');

  error$ = this.error.asObservable();

  private results: Map<string, Result> = new Map();
  private subproblems: Map<string, MatricialForm> = new Map();

  constructor(private matDialog: MatDialog) { }

  ngOnInit() {
    const inputEditor = this.inputEditor = edit(this.editor.nativeElement);
    inputEditor.setTheme(THEME);
    inputEditor.getSession().setMode(MODE);

    const input = new BehaviorSubject<string>('');
    inputEditor.addEventListener('change', () => {
      input.next(inputEditor.getValue());
    });

    inputEditor.setValue(`max (4a - b)
    st:
    7a - 2b <= 14
    b <= 3
    3a - 2b <= 3
    a >= 0
    b >= 0
    `);
    inputEditor.clearSelection();
    this.network = new Network(this.graphDiv.nativeElement, {}, {
      physics: true,
      edges: {
        smooth: {
          enabled: true,
          type: 'continuous',
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

    this.network.on('click', (properties) => {
      const ids = properties.nodes as string[];
      if (ids.length === 1) {
        const id = ids[0];
        const mat = this.subproblems.get(id);
        const res = this.results.get(id);
        this.matDialog.open(ViewPlComponent, { data: { mat, res } });
      }
    });

    input.pipe(switchMap(problem => branchAndBound(problem)))
      .subscribe(event => {
        switch (event.type) {
          case 'parserError':
            inputEditor.getSession().setAnnotations(event.annotations);
            this.error.next('');
            break;
          case 'error':
            inputEditor.getSession().clearAnnotations();
            this.error.next(event.message);
            break;
          case 'start':
            this.results = new Map();
            this.subproblems = new Map();
            inputEditor.getSession().clearAnnotations();
            this.error.next('');
            this.nodes = new DataSet<Node>();
            this.edges = new DataSet<Edge>();
            this.network.setData({ nodes: this.nodes, edges: this.edges });
            // focus on the first node
            setTimeout(() => {
              const vrect = ((this.network as any).body.container as HTMLDivElement).getBoundingClientRect();
              this.network.focus('1', {
                scale: 1,
                locked: true,
                offset: {
                  x: 0,
                  y: 83 - vrect.height / 2
                }
              });
            });
            break;
          case 'subproblem':
            this.subproblems.set(event.id, event.mat);
            this.nodes.add({
              id: event.id,
              label: 'Subproblem #' + event.id
            });
            if (event.parentId) {
              this.edges.add({
                from: event.parentId,
                label: event.edgeLabel,
                to: event.id
              });
            }
            break;
          case 'subresult':
            this.results.set(event.id, event.res);
            if (event.res.type === 'ILIMITED' || event.res.type === 'INFEASIBLE') {
              this.nodes.update({
                id: event.id,
                label: 'Subproblem #' + event.id + '\n' + event.res.type,
                shape: 'circle'
              });
            } else {
              const value = event.res.value.denominator === '1' ?
                event.res.value.numerator :
                (event.res.value.numerator + '/' + event.res.value.denominator);
              this.nodes.update({
                id: event.id,
                label: 'Subproblem #' + event.id + '\n' +
                  (event.fracIdx !== -1 ? 'fractional' : 'integer') +
                  '\nvalue: ' + value,
                shape: 'circle',
                title: createSolutionElement(event.res.solution, event.res.vars) as any
              });
            }
        }
      });
  }

  ngOnDestroy() {
    this.network.destroy();
    this.inputEditor.destroy();
    this.branchAndBoundSubscription.unsubscribe();
  }

}
