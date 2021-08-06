import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [sss, setSss] = React.useState<any>('test');

  React.useEffect(
    () => {
      fetch('http://localhost:5000/users')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setSss(data.lol)
      });
    },
    []
  )

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Reacts
        </a>
        <div>{ sss }</div>
      </header>
    </div>
  );
}

export default App;
