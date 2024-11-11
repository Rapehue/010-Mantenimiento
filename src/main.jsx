import { createRoot } from 'react-dom/client'
import './index.css'
import { Mantenimiento } from './Mantenimiento.jsx'
import { BrowserRouter } from 'react-router-dom';
import { FormDelivery } from './bugs/pages/FormDelivery.jsx';
import { store } from './store/store';
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <BrowserRouter>
          <Mantenimiento />
      </BrowserRouter>
    </Provider>
)