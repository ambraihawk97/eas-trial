declare module "sudoku" {
  export type Board = (number | null)[];
  export function makepuzzle(): Board;
  export function solvepuzzle(puzzle: Board): number[] | null;
  export function ratepuzzle(puzzle: Board, samples?: number): number;
  export function posfor(cell: number): [number, number];
}