import NoMatch from '@/pages/404'
import AboutMe from '@/pages/aboutme'
import Achieve from '@/pages/achieve'
import Home from '@/pages/home'
import Post from '@/pages/post'
import Tag from '@/pages/tag'

export default [{
  component: Home,
  exact: true,
    path: '/',
  },
  {
    component: AboutMe,
    exact: true,
    path: '/about-me',
  },
  {
    component: Post,
    exact: true,
    path: '/post/:post_name',
  },
  {
    component: Tag,
    exact: true,
    path: '/tag/:tag_name',
  },
  {
    // I don't think i will live to 2099-12
    component: Achieve,
    exact: true,
    path: '/achieve/:date(20[0-9]{2}-[0-9]{2})',
  },
  {
    component: NoMatch,
  },
]
