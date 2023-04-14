import { IOption } from "./iOptions";

export interface UISelectionState {
    id: string;
    value: string;
    options: IOption[];
    open: boolean;
  }