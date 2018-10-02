
import React from "react";
import TextField from "material-ui/TextField";
import CheckIcon from "material-ui/svg-icons/navigation/check";
import CancelIcon from "material-ui/svg-icons/navigation/cancel";
import { TableRowColumn } from "material-ui/Table";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        ...props.x
      },
      errors: {
        firstName: "",
        lastName: "",
        location: "",
        status: "",
        controlledDate: ""

      }
    };
  }

  change = e => {
    const { name, value } = e.target;
    this.setState(state => ({
      values: {
        ...state.values,
        [name]: value
      }
    }));
  };

  validate = () => {
    let isError = false;
    const errors = {
      firstName: "",
      lastName: "",
      location: "",
      status: "",
      controlledDate: ""
    };
    const { status} = this.state.values;

    if (status.length < 5) {
      isError = true;
      errors.username = "Status needs to be either: 'pending, upcoming, failed, passed'";
    }



    this.setState({
      errors
    });

    return isError;
  };




  onSubmit = e => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.props.handleSave(this.props.i, this.state.values);
    }
  };

  render() {
    const { header } = this.props;
    return [
      header.map((y, k) => (
        <TableRowColumn key={`trc-${k}`}>
          <TextField
            name={y.prop}
            onChange={this.change}
            value={this.state.values[y.prop]}
            errorText={this.state.errors[y.prop]}
          />
        </TableRowColumn>
      )),
      <TableRowColumn key="icon-row-column">
        <CheckIcon onClick={this.onSubmit} />
        <CancelIcon onClick={this.props.stopEditing} />
      </TableRowColumn>
    ];
  }
}
