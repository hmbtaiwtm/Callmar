import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './1-App/App'
import './index.css'
import { store } from './1-App/redux/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App></App>
    </Provider>
  </BrowserRouter>
)
