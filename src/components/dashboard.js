import React, { Component } from "react";
const userService = require("../services/users.service");

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
        };
    }

    componentDidMount() {
        userService.getUser().then((user) => {
            this.setState({ first_name: user.first_name });
            this.setState({ last_name: user.last_name });
        });
    }

    render() {
        return (
            <h1>
                {this.state.first_name} {this.state.last_name}
            </h1>
        );
    }
}
