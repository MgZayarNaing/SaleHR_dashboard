
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'simplebar/src/simplebar.css';
import { Provider as ReduxProvider } from 'react-redux';
import 'assets/third-party/apex-chart.css';

import App from './App';
import { store } from 'store';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>

);


reportWebVitals();
