import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Network, Options, Data, Edge, DataSet } from 'vis';
import { edit } from 'ace-builds';
import { animationFrameScheduler, interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { getSpinnerImageOnTime } from './spinner';


import './prog-lin.ace.mod';
import 'ace-builds/src-noconflict/theme-monokai';

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

  network: Network;
  animationSubscription: Subscription;

  ngOnInit() {
    const inputEditor = edit(this.editor.nativeElement);
    inputEditor.setTheme(THEME);
    inputEditor.getSession().setMode(MODE);
    inputEditor.setValue(`max(-3a -4b +5c -5d)
    st:
        +1a +1b +0c +0d <= +5;
        -1a +0b -5c +5d <= -10;
        +2a +1b +1c -1d <= +10;
        -2a -1b -1c +1d <= -10;
        a >= 0;
        b >= 0;
        c >= 0;
        d >= 0;
`);
    inputEditor.clearSelection();

    const options: Options = {
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
        shape: 'circle',
        color: {
          background: 'white'
        },
      },
      layout: {
        hierarchical: {
          enabled: true,
          direction: 'UD',
          sortMethod: 'directed'
        }
      }
    };

    const nodes = new DataSet([
      { id: 'program', label: 'PROGRAM', shape: 'circularImage' },
      { id: 'p-identifier', label: 'test' },
      { id: 'body', label: 'BODY' }
    ]);

    const edges: Edge[] = [
      { from: 'program', to: 'p-identifier' },
      { from: 'p-identifier', to: 'body' }
    ];

    const data: Data = { nodes, edges };

    this.network = new Network(this.graphDiv.nativeElement, data, options);

    this.animationSubscription = interval(0, animationFrameScheduler).pipe(
      map(() => animationFrameScheduler.now()),
      map(getSpinnerImageOnTime)
    ).subscribe(svg => {
      nodes.forEach(item => {
        (item as any).image = svg;
        nodes.update(item);
      });
    });
  }

  ngOnDestroy() {
    this.animationSubscription.unsubscribe();
  }

}
