import * as React from 'react'

interface NoMatchProps {
  children: any,
}

export default class NoMatch extends React.Component<NoMatchProps, {}> {
  public render() {
    return (
      <h1>404 not found</h1>
    )
  }
}
