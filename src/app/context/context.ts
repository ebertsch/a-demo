export interface Context {
    dateRange: [Date, Date];
}

export const defaultContext: Context = {
    dateRange: [new Date(), (new Date())],
  }