import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Dashboard from './Components/Dashboard'
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import AddStockForm from './Components/Forms/AddStockForm';
import AddFutureForm from './Components/Forms/AddFutureForm';
import AddCDForm from './Components/Forms/AddCDForm';

export const PathRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/addstock" element={<AddStockForm />} />
        <Route path="/addfuture" element={<AddFutureForm />} />
        <Route path="/addcd" element={<AddCDForm />} />
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PathRouter />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
