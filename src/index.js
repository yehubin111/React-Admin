import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import reportWebVitals from './reportWebVitals';
import Route from './router/';
import defaultConfig from './defaultConfig';
// redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer, { persistReducers } from './redux/reducers';
// 数据持久化
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
// 国际化
import "./i18n";
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
import { useTranslation } from "react-i18next";

dayjs.locale('zh-cn');

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


const persistConfig = {
  key: defaultConfig.productName,
  storage,
  whitelist: persistReducers
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer
)
const persistor = persistStore(
  store
)

const render = Component => {
  const App = () => {
    // 绑定到React对象上
    const { t, i18n } = useTranslation();
    React.t = t;
    React.i18nLocale = i18n.changeLanguage.bind(i18n);

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Component />
        </PersistGate>
      </Provider>
    )
  }

  ReactDOM.render(
    <App />
    ,
    document.getElementById('root')
  );
}
render(Route);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
