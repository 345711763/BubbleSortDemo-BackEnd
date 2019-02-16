import React, { Component } from "react";
import axios from "axios";
import ShowSortSteps from "./components/showSortSteps";
class App extends Component {
  constructor(props) {
    super(props);
    // Set Default State
    this.state = {
      data: [],
      type: "Int",
      isValid: false
    };
    this.timeout = []; // store all timeout ID
  }

  onSubmitHandler() {
    axios
      .post("http://localhost:4000", {
        data: this.state.data,
        type: this.state.type
      })
      .then(res => {
        let data = res.data;
        console.log(res.data);
        this.animation.bind(this)(data); //show sort steps
      })
      .catch(error => console.log(error));
  }

  onInputChangeHandler(e) {
    this.timeout.forEach(timeout => clearTimeout(timeout)); // clear all animation timeout when user is changing input
    let data = e.target.value.split(",");
    //Validate Input data
    const isValid = this.validateInput(data, this.state.type);
    //Update state according to "type"
    if (this.state.type === "Int") {
      for (let i = 0; i < data.length; i++) {
        data[i] = parseInt(data[i]);
      }
    }
    this.setState({
      data: data,
      isValid: isValid
    });
  }

  onTypeChangeHandler(e) {
    this.setState({
      type: e.target.value,
      data: []
    });
  }
  animation(data) {
    // Show sort steps by changing state recursively
    if (data.length > 0) {
      this.timeout.push(
        setTimeout(() => {
          this.setState({
            data: data[0]
          });
          data.shift();
          this.animation(data);
        }, 1000)
      );
    }
  }
  validateInput(data, type) {
    //check data size 1 - 500
    if (data.length < 1 && data.length > 500) {
      return false;
    }
    if (type === "String") {
      // check each string length ( 1 - 10 characters)
      for (let i = 0; i < data.length; i++) {
        if (data[i].length < 1 || data[i].length > 10) {
          return false;
        }
      }
    }
    if (type === "Int") {
      //check integer
      for (let i = 0; i < data.length; i++) {
        if (data[i].length === 0) {
          return false;
        } else if (!Number.isInteger(Number(data[i]))) {
          return false;
        } else if (
          data[i] > Number.MAX_SAFE_INTEGER ||
          data[i] < Number.MIN_SAFE_INTEGER
        ) {
          return false;
        }
      }
    }

    return true;
  }
  render() {
    //According to MVC, deliver props to "View" component and render it.
    return (
      <ShowSortSteps
        data={this.state.data}
        type={this.state.type}
        isValid={this.state.isValid}
        onInputChangeHandler={this.onInputChangeHandler.bind(this)}
        onTypeChangeHandler={this.onTypeChangeHandler.bind(this)}
        onSubmitHandler={this.onSubmitHandler.bind(this)}
      />
    );
  }
}

export default App;
