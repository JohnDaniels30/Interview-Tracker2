import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import DatePicker from "material-ui/DatePicker";

export default class Form extends React.Component {
  state = {
    firstName: "",
    firstNameError: "",
    lastName: "",
    lastNameError: "",
    location: "",
    locationError: "",
    controlledDate: "",
    controlledDateError: "",
    status: "",
    statusError: ""
  };

  change = e => {
    // this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleChange = (event, date) => {
    this.setState({
      controlledDate: date,
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      firstNameError: "",
      lastNameError: "",
      locationError: "",
      statusError: "",
      controlledDate:""
    };

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  onSubmit = e => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.props.onSubmit(this.state);
      // clear form
      this.setState({
        firstName: "",
        firstNameError: "",
        lastName: "",
        lastNameError: "",
        location: "",
        locationError: "",
        controlledDate: "",
        controlledDateError: "",
        status: "",
        statusError: ""

      });
    }
  };

  render() {
    return (
      <form>
        <TextField
          name="firstName"
          hintText="First name"
          floatingLabelText="First name"
          value={this.state.firstName}
          onChange={e => this.change(e)}
          errorText={this.state.firstNameError}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="lastName"
          hintText="Last Name"
          floatingLabelText="Last Name"
          value={this.state.lastName}
          onChange={e => this.change(e)}
          errorText={this.state.lastNameError}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="location"
          hintText="Location"
          floatingLabelText="Location"
          value={this.state.location}
          onChange={e => this.change(e)}
          errorText={this.state.locationError}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="status"
          hintText="Status"
          floatingLabelText="Status"
          value={this.state.status}
          onChange={e => this.change(e)}
          errorText={this.state.statusError}
          floatingLabelFixed
        />
        <br />
        <DatePicker
          name="controlledDate"
          hintText="Date"
          floatingLableText="Date"
          value={this.state.controlledDate}
          onChange={this.handleChange}
        />
        <br />


        <RaisedButton label="Submit" onClick={e => this.onSubmit(e)} primary />
      </form>
    );
  }
}
