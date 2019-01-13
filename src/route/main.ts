import Home from '@/pages/home'
import Post from '@/pages/post'
import Tag from '@/pages/tag'
import Achieve from '@/pages/achieve'
import AboutMe from '@/pages/aboutme'
import NoMatch from '@/pages/404'

export default [{
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/about-me',
    exact: true,
    component: AboutMe,
  },
  {
    path: '/post/:post_name',
    exact: true,
    component: Post,
  },
  {
    path: '/tag/:tag_name',
    exact: true,
    component: Tag,
  },
  {
    // I don't think i will live to 2099-12
    path: '/achieve/:date(20[0-9]{2}-[0-9]{2})',
    exact: true,
    component: Achieve,
  },
  {
    component: NoMatch,
  }
]