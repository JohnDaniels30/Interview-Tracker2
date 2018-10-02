import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import orderBy from "lodash/orderBy";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";


import "./App.css";
import Form from "./Form";
import Table from "./Table";



const invertDirection = {
  asc: "desc",
  desc: "asc"
};

class App extends Component {
  state = {
    data: [
      {
        firstName: "Joseph",
        lastName: "Cowers",
        location: "Alabama",
        status: "upcoming",
        date: "2018-10-05"

      },
      {
        firstName: "John",
        lastName: "Franklin",
        location: "Texas",
        status: "pending",
        date: "2018-12-06"
      },
      {
        firstName: "Rick",
        lastName: "Ross",
        location: "Colorado",
        status: "pending",
        date: "2018-06-12"
      },
      {
        firstName: "Steve",
        lastName: "Kerr",
        location: "Georgia",
        status: "passed",
        date: "2018-10-01"
      },
      {
        firstName: "Will",
        lastName: "Ferrell",
        location: "France",
        status: "failed",
        date: "2018-09-12"
      }

    ],
    editIdx: -1,
    columnToSort: "",
    sortDirection: "desc",
    query: "",
    columnToQuery: "firstName"
  };

  handleRemove = i => {
    this.setState(state => ({
      data: state.data.filter((row, j) => j !== i)
    }));
  };

  startEditing = i => {
    this.setState({ editIdx: i });
  };

  stopEditing = () => {
    this.setState({ editIdx: -1 });
  };

  handleSave = (i, x) => {
    this.setState(state => ({
      data: state.data.map((row, j) => (j === i ? x : row))
    }));
    this.stopEditing();
  };

  handleSort = columnName => {
    this.setState(state => ({
      columnToSort: columnName,
      sortDirection:
        state.columnToSort === columnName
          ? invertDirection[state.sortDirection]
          : "asc"
    }));
  };

  render() {
    const lowerCaseQuery = this.state.query.toLowerCase();
    return (
      <MuiThemeProvider>
      <h1> Interview Tracker </h1>
        <div className="App">
          <Form
            onSubmit={submission =>
              this.setState({
                data: [...this.state.data, submission]
              })
            }

          />
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", margin: "auto" }}>
              <TextField
                hintText="Query"
                floatingLabelText="Query"
                value={this.state.query}
                onChange={e => this.setState({ query: e.target.value })}
                floatingLabelFixed
              />
              <SelectField
                style={{ marginLeft: "1em" }}
                floatingLabelText="Select a column"
                value={this.state.columnToQuery}
                onChange={(event, index, value) =>
                  this.setState({ columnToQuery: value })
                }
              >
                <MenuItem value="firstName" primaryText="First Name" />
                <MenuItem value="lastName" primaryText="Last Name" />
                <MenuItem value="location" primaryText="Location" />
                <MenuItem value="status" primaryText="Status" />

              </SelectField>
            </div>
          </div>
          <Table
            handleSort={this.handleSort}
            handleRemove={this.handleRemove}
            startEditing={this.startEditing}
            editIdx={this.state.editIdx}
            stopEditing={this.stopEditing}
            handleSave={this.handleSave}
            columnToSort={this.state.columnToSort}
            sortDirection={this.state.sortDirection}
            data={orderBy(
              this.state.query
                ? this.state.data.filter(x =>
                    x[this.state.columnToQuery]
                      .toLowerCase()
                      .includes(lowerCaseQuery)
                  )
                : this.state.data,
              this.state.columnToSort,
              this.state.sortDirection
            )}
            header={[
              {
                name: "First name",
                prop: "firstName"
              },
              {
                name: "Last name",
                prop: "lastName"
              },
              {
                name: "Location",
                prop: "location"
              },
              {
                name: "Status",
                prop: "status "
              },
              {
                name: "Date",
                prop: "date"
              }
          ]}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
