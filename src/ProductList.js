import React from 'react';
import { Table, Button, Alert } from 'react-bootstrap';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      //products: [],
      books: [],
      response: {}
    }
  }

  componentDidMount() {
    const apiUrl = 'http://localhost/library/public/api/books';

    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            books: result.data
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  deleteBook(id) {
    const { products } = this.state;

    const apiUrl = 'http://localhost/library/public/api/books/delete/'.id;
    //const formData = new FormData();
    //formData.append('is', productId);

    const options = {
      method: 'DELETE',
      //body: formData
    }

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            response: result,//,
            
            //products: products.filter(product => product.id !== productId)
          });
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
         
          {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>}
          <Table>
            <thead>
              <tr>
                <th>ISBN</th>
                <th>TITLE</th>                 
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id}>
                  <td>{book.isbn}</td>
                  <td>{book.title}</td>                 
                  <td>
                   
                    &nbsp;<Button variant="danger" onClick={() => this.deleteBook(book.isbn)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )
    }
  }
}

export default ProductList;