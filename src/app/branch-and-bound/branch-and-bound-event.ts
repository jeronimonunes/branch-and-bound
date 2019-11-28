import { MatricialForm } from './matricial-form';

import { Result } from 'src/native/simplex';
import { Fraction } from 'linear-program-parser';

interface StartEvent {
  type: 'start';
}

interface ParserErrorEvent {
  type: 'parserError';
  annotations: Array<{
    column: number,
    row: number,
    text: string,
    type: 'error'
  }>;
}

interface ErrorEvent {
  type: 'error';
  message: string;
}

interface SubProblemEvent {
  type: 'subproblem';
  id: string;
  mat: MatricialForm;
  parentId: string | undefined;
  edgeLabel: string | undefined;
}

interface SubResultEvent {
  type: 'subresult';
  id: string;
  res: Result;
  fracIdx: number;
  value: Fraction;
}

interface OptimalResultEvent {
  type: 'optimal';
  value: Fraction;
  id: string;
}

export type BranchAndBoundEvent = StartEvent
  | ParserErrorEvent
  | ErrorEvent
  | SubProblemEvent
  | SubResultEvent
  | OptimalResultEvent;
