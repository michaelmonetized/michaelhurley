import type * as React from "react";

type Booleanish = boolean | "true" | "false";

type MathMLElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  accent?: Booleanish;
  accentunder?: Booleanish;
  actiontype?: string;
  align?: "top" | "bottom" | "center" | "baseline" | "axis";
  close?: string;
  columnalign?: string;
  columnlines?: string;
  columnspacing?: string;
  columnspan?: number | string;
  depth?: number | string;
  display?: "inline" | "block" | string;
  displaystyle?: Booleanish;
  encoding?: string;
  fence?: Booleanish;
  frame?: string;
  framespacing?: string;
  groupalign?: string;
  height?: number | string;
  href?: string;
  id?: string;
  indentalign?: string;
  indentalignfirst?: string;
  indentalignlast?: string;
  indentshift?: string;
  indentshiftfirst?: string;
  indentshiftlast?: string;
  intent?: string;
  largeop?: Booleanish;
  length?: number | string;
  linethickness?: number | string;
  location?: string;
  mathbackground?: string;
  mathcolor?: string;
  mathsize?: number | string;
  mathvariant?: string;
  maxsize?: number | string;
  minsize?: number | string;
  movablelimits?: Booleanish;
  notation?: string;
  open?: string;
  other?: string;
  rowspan?: number | string;
  rowalign?: string;
  rowlines?: string;
  rowspacing?: string;
  selection?: string;
  separator?: Booleanish;
  separators?: string;
  shift?: number | string;
  side?: string;
  src?: string;
  stretchy?: Booleanish;
  subscriptshift?: number | string;
  superscriptshift?: number | string;
  symmetric?: Booleanish;
  voffset?: number | string;
  width?: number | string;
  xmlns?: string;
};

type MathMLIntrinsicElements = {
  annotation: MathMLElementProps;
  "annotation-xml": MathMLElementProps;
  maction: MathMLElementProps;
  maligngroup: MathMLElementProps;
  malignmark: MathMLElementProps;
  math: MathMLElementProps;
  menclose: MathMLElementProps;
  merror: MathMLElementProps;
  mfenced: MathMLElementProps;
  mfrac: MathMLElementProps;
  mglyph: MathMLElementProps;
  mi: MathMLElementProps;
  mlabeledtr: MathMLElementProps;
  mmultiscripts: MathMLElementProps;
  mn: MathMLElementProps;
  mo: MathMLElementProps;
  mover: MathMLElementProps;
  mpadded: MathMLElementProps;
  mphantom: MathMLElementProps;
  mprescripts: MathMLElementProps;
  mroot: MathMLElementProps;
  mrow: MathMLElementProps;
  ms: MathMLElementProps;
  mspace: MathMLElementProps;
  msqrt: MathMLElementProps;
  mstyle: MathMLElementProps;
  msub: MathMLElementProps;
  msubsup: MathMLElementProps;
  msup: MathMLElementProps;
  mtable: MathMLElementProps;
  mtd: MathMLElementProps;
  mtext: MathMLElementProps;
  mtr: MathMLElementProps;
  munder: MathMLElementProps;
  munderover: MathMLElementProps;
  none: MathMLElementProps;
  semantics: MathMLElementProps;
};

declare module "react" {
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends MathMLIntrinsicElements {}
  }
}

declare module "react/jsx-runtime" {
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends MathMLIntrinsicElements {}
  }
}

export {};
