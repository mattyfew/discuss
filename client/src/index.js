import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './configureStore';
import Root from './components/root';
import * as io from 'socket.io-client';


// const socket = io.connect('http://localhost:3090');
//
// socket.on('socketping', function(data) {
//     console.log("PING");
// });

const store = configureStore();

ReactDOM.render(
    <Root store={store} />,
    document.querySelector('.container')
);
