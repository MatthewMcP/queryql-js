import React from 'react';
import MattHeader from './components/MattHeader';
import QueryQL from './pages/queryQL';

function App() {
    return (
        <div>
            <MattHeader />
            <header>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
                    Learn React
                </a>
            </header>
            <QueryQL />
        </div>
    );
}

export default App;
