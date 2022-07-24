import {Header} from './header';
import React from 'react';
import {useImmer} from './library';

function Example2() {
  const [state, updateState] = useImmer({
    books: [
      {id: 1, is_open: true, price: 100},
      {id: 2, is_open: false, price: 200},
      {id: 3, is_open: true, price: 300},
    ],
    id_counter: 4
  })

  const open = function(book_index) {
    updateState(state => {
      state.books[book_index].is_open = true
    })
  }

  const close = function(book_index) {
    updateState(state => {
      state.books[book_index].is_open = false
    })
  }

  const add = function() {
    updateState(state => {
      state.books.push({id: state.id_counter, is_open: false, price: 80})
      state.id_counter += 1
    })
  }

  const increase_price = function(book_index, price) {
    updateState(state => {
      state.books[book_index].price += price
    })
  }

  return (
    <div >
      <Header/>
      <h2>Example2</h2>
      <div className="top_box" >
        {state.books.map((book, book_index) => (
          <div key={book.id} style={{border: "solid red 1px", padding: "10px"}} >
            Book-{book.id}
            <div>{book.is_open ? "Open" : "Close"} ; Price = {book.price}</div>
            <button onClick={() => open(book_index)} >Open</button>
            <button onClick={() => close(book_index)} >Close</button>
            <button onClick={() => increase_price(book_index, 100)} >
              Increase Price
            </button>
          </div>
        ))}
      </div>
      <button onClick={add} >Add</button>
    </div>
  );
}

export default Example2;
