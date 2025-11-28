// types.d.ts
declare namespace JSX {
  type Element = Promise<any>;

  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// say TypeScript that JSX.Element is a Promise
declare global {
  namespace JSX {
    interface Element extends Promise<any> {}
  }
}
