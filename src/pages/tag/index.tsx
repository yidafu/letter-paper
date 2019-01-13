import * as React from 'react'

interface TagProps {
  children: any,
}

export default class Tag extends React.Component<TagProps, {}> {
  public render() {
    return (
      <div>Tag</div>
    )
  }
}
