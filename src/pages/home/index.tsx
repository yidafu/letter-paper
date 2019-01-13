import * as React from 'react'
import { Link } from 'react-router-dom'

interface Props {}

export default class Home extends React.Component<Props, {}> {
  render() {
    return (
    <div>
      <h1>
        Home
      </h1>
      <ul>
        <li>
          <Link to="/post/test-post">Post</Link>
        </li>
        <li>
          <Link to="/tag/tag1">tag</Link>
        </li>
        <li>
          <Link to="/achieve/2099-12">achieve</Link>
        </li>
        <li>
          <Link to="/about-me">about me</Link>
        </li>
        <li>
          <Link to="/qwertyuiop">404 No Match</Link>
        </li>
      </ul>
    </div>
    )
  }
}

