/* 
  Implement a button which makes a get request to https://reqres.in/ to get a list of users and display them.
  100% free reign to accomplish this goal however you wish, within the context of react.

  apiMethods.js file has already been stubbed out for you. Feel free to use it or not.

  ****Make any changes to this boilerplate that you want to.*****
  ****The included code is only provided as a convienence.****

  Bonus 1:  Add a button for each user to make a delete request to delete that user. 
          Update the displayed users excluding the deleted user.

  Bonus 2: Make a filter box to filter the displayed users by name.
*/

import React from "react";
import ReactDOM from "react-dom";
import { getUsers, deleteUser /* bonus:, deleteUser*/ } from "./apiMethods";

import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = { users: [], searchQuery: "" };
  }
  getUsersHandler = async () => {
    const users = await getUsers();
    this.setState({ ...this.state, users });
  };

  deleteUserHandler = (userId) => () => {
    const filteredUsers = deleteUser(this.state.users, userId);
    this.setState({ ...this.state, users: filteredUsers });
  };

  onChangeHandler = (event) => {
    this.setState({ ...this.state, searchQuery: event.target.value });
  };

  searchHandler = () => {
    const formatedSearchQuery = this.state.searchQuery.toLowerCase();
    const filteredUsers = this.state.users.filter((user) => {
      const lowercaseFirstName = user.first_name.toLowerCase();
      const lowercaseLastName = user.last_name.toLowerCase();
      const isTrue =
        lowercaseFirstName.startsWith(formatedSearchQuery) ||
        lowercaseLastName.startsWith(formatedSearchQuery);
      return isTrue;
    });

    this.setState({ ...this.state, users: filteredUsers });
  };
  render() {
    return (
      <div className="App">
        <button onClick={this.getUsersHandler}>Get users</button>
        <h2>Users from API:</h2>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <input
            placeholder="Type name"
            value={this.state.searchQuery}
            onChange={this.onChangeHandler}
          />
          <button onClick={this.searchHandler} style={{ marginLeft: "5px" }}>
            Search
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {this.state.users.map((user) => (
            <div key={user.id} style={{ display: "flex" }}>
              <span>{`${user.first_name} ${user.last_name}`}</span>
              <span
                onClick={this.deleteUserHandler(user.id)}
                style={{
                  color: "red",
                  textDecoration: "underline",
                  marginLeft: "10px",
                  cursor: "pointer"
                }}
              >
                Delete
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
