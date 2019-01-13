import * as React from 'react'

interface PostProps {
  children: any,
}

export default class Post extends React.Component<PostProps, {}> {
  public render() {
    return (
      <div>post</div>
    )
  }
}
