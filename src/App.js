import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './components/Main';

import { Provider } from 'react-redux';
import {store} from './redux/Store'

function App() {
  return (
    <div >
      <Provider store={store}>
      <BrowserRouter>
      <Main/>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
