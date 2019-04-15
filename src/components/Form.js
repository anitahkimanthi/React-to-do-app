import React, { Component } from 'react';
import '../App.css';
import List from './List';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemValue: '',
      todoItems: []
    };
  }

  componentDidMount() {
    fetch('https://todo-api-london.now.sh/lists', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        list: {
          name: 'my list'
        }
      })
    })
    .then((res) => res.json())
    .then(( data ) => {
      this.setState({
        listId: data.list.id
      });
    });
  }

  onChange = (event) => {
    this.setState({ itemValue: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { listId, itemValue } = this.state;

    fetch('https://todo-api-london.now.sh/items', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        item: {
          list_id: listId,
          description: itemValue
        }
      })
    })
    .then(() => {
      return fetch(`https://todo-api-london.now.sh/lists/${listId}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        }
      }).then((res) => res.json())
    })
    .then((data) => {
      this.setState({
        todoItems: data.list.items.map(({ description }) => description)
      })
    });
  }
  removeTodo =(name)=>{
    this.setState({
        todo: this.state.todo.filter(el => el !== name)
    })
}
  render() {
    return (
      <div >
        <nav>
          <div class="nav-wrapper">
           
          </div>
        </nav>
        <div className="container">
        <form className="App row" onSubmit={this.onSubmit}>
          <p>Add your to do list here</p>
          <div class="input-field col s6">
            <input value={this.state.itemValue} onChange={this.onChange} />
          </div>
          <div class="col s6">
          <button class="btn waves-effect waves-light" type="submit" name="action">Add
          </button>
          </div>
        </form>
        </div>
        <List todoItems={this.state.todoItems} removeTodo={this.removeTodo} />
      </div>
    );
  }
}
