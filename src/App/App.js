import React, { lazy, Suspense } from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Loader from '../Components/Loader/Loader';

const WebhooksCom = lazy(() => import('../Containers/Webhooks/Webhooks'))
const HistoryCom = lazy(() => import('../Containers/History/History'))

function App() {
  
  const routes = (
    <Routes>
      <Route path='/' element={<WebhooksCom />} />
      <Route path='/history' element={<HistoryCom />} />
    </Routes>
  )

  return (
    <div className="App container">
      <Suspense fallback={<Loader smallSize={50} largeSize={70} />}>
        {routes}
      </Suspense>
    </div>
  );
}

export default App;
