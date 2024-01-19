import './normalize.css';
import './skeleton.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import Footer from './components/Footer';
import Main from './components/Main';
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="container">
          <Main />
          <Footer />
        </div>
      </div>
    </Provider>
  );
}

export default App;
