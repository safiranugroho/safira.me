import * as React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'doodles-ball': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'doodles-keyboard': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}