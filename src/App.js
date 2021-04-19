import React, { Component } from 'react';
import './App.css';
import { Container, Button, Alert } from 'react-bootstrap';
import BookList from './components/book.list.component';


class App extends Component {

  render() {

    return (
      <div className="App">
        <Container>        
          <BookList/>             
        </Container>
  
      </div>
    );
  }
}

export default App;