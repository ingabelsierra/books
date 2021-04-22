import React from 'react';
//import React, { useState, useEffect } from 'react';
//import { Table, Button, Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import ReactPaginate from 'react-paginate';

class  BookList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,     
      books: [],
      response: {},
      offset: 0,
      data: [],
      perPage: 2,
      currentPage: 0
    }

  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.getbooks()
    });

};

  componentDidMount() {
   this.getbooks();
  }

  getbooks(){

    const apiUrl = 'https://ingenierosierradiaz.com/library/api/books';

    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {

          this.setState({
            books: result.data
          });

          const data = result.data;
          const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
          const bookData = slice.map(book => <React.Fragment>
            
            <ul class="list-group">
            <li class="list-group-item">
            <p>ISBN {book.isbn}</p>
            <p>{book.title}</p>
            <p>
            <>
            <Button variant="danger" onClick={() => this.deleteBook(book.isbn)}>Delete</Button>
            </>
            </p>
            
            </li>
         
            </ul>              
             
          </React.Fragment>)

          this.setState({
          pageCount: Math.ceil(data.length / this.state.perPage),
 
         bookData
         })

         
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  deleteBook(id) {  

    const apiUrl = 'https://ingenierosierradiaz.com/library/api/books/delete/'+id; 

    const options = {
      method: 'DELETE',    
    }

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result)
         
          this.setState({
            response: result.message,            
          });
          alert('Registro Eliminado !');

          this.getbooks();
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  render() {
    const { error, books} = this.state;

    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      return(
        <div>
        {this.state.bookData}
        <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}/>
        </div>
      
      )
    }
  }
}

export default BookList;