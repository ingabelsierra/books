import React from "react";
import { Button } from "react-bootstrap";
import Figure from "react-bootstrap/Figure";
import ReactPaginate from "react-paginate";

class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      books: [],
      offset: 0,
      autors: [],
      perPage: 2,
      currentPage: 0,
    };
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.getbooks();
      }
    );
  };

  componentDidMount() {
    this.getbooks();
  }

  getbooks() {
    const apiUrl = "https://ingenierosierradiaz.com/library/api/books";

    fetch(apiUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            books: result.data,
          });

          const data = result.data;
          const slice = data.slice(
            this.state.offset,
            this.state.offset + this.state.perPage
          );
          const bookData = slice.map((book) => (
            <React.Fragment>
              <ul class="list-group">
                <li class="list-group-item">
                  <p>
                    <h5 className="subheading"> ISBN </h5>
                    {book.isbn}
                  </p>
                  <p>
                    <Figure>
                      <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src={book.cover_large}
                      />
                      <Figure.Caption>{book.title}</Figure.Caption>
                    </Figure>
                  </p>
                  <p>
                    <>
                      <Button
                        variant="danger"
                        onClick={() => this.deleteBook(book.isbn)}
                      >
                        Delete
                      </Button>
                    </>
                  </p>
                </li>
              </ul>
            </React.Fragment>
          ));

          this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),

            bookData,
          });
        },
        (error) => {
          this.setState({ error });
        }
      );
  }

  deleteBook(id) {
    const apiUrl =
      "https://ingenierosierradiaz.com/library/api/books/delete/" + id;

    const options = {
      method: "DELETE",
    };

    fetch(apiUrl, options)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            response: result.message,
          });
          alert("Registro Eliminado !");

          this.getbooks();
        },
        (error) => {
          this.setState({ error });
        }
      );
  }

  render() {
    const { error } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
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
            activeClassName={"active"}
          />
        </div>
      );
    }
  }
}

export default BookList;
