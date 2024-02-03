import './normalize.css';
import './skeleton1.css';
import './App1.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import AppRouter from './components/AppRouter';
import Error from './components/Error';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Error />
          <AppRouter />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
