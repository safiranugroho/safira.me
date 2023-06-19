import * as React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'web-component-ball': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}