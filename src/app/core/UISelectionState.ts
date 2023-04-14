import { IOption } from "./iOptions";
export interface UISelectionStateForDate {
  id: number;
  value: string;
  open: boolean;
}
export interface UISelectionStateWithOptions {
    id: string;
    value: string;
    options?: IOption[];
    open: boolean;
  }