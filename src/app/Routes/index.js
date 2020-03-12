import HomePage from '../pages/HomePage/HomePage'
import InfoPage from '../pages/InfoPage/InfoPage'

const routes = {
  HOME:'/',
  INFO:'/info'
}

const config = [
  {
    path:routes.HOME,
    exact: true,
    component: HomePage
  },
  {
    path:routes.INFO,
    component: InfoPage
  },
]


export default routes
export {config}

