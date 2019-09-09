import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Posts from './components/Posts';
import Users from './components/Users';
import Header from './components/Header';
import EditPost from './components/EditPost';
import AddPost from './components/AddPost';
import Post from './components/Post';
import rootReducer from './reducers/';
import './index.css';

const store = createStore(rootReducer, applyMiddleware(thunk));

console.log('store', store);
console.log('store.getState()', store.getState());

store.subscribe(() => console.log('store.getState()', store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Users />} />
        <Route path="/posts" render={() => <Posts />} />
        <Route path="/post" render={() => <Post />} />
        <Route path="/editPost" render={() => <EditPost />} />
        <Route path="/addPost" render={() => <AddPost />} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
