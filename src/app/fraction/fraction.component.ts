import { Component, Input } from '@angular/core';
import { NativeFraction } from 'src/native/simplex';

@Component({
  selector: 'app-fraction',
  templateUrl: './fraction.component.html',
  styleUrls: ['./fraction.component.scss']
})
export class FractionComponent {

  @Input() public value: NativeFraction | undefined;

  constructor() { }

}
