import { React, Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class Signin extends Component {
    state = {
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
        failedLoginError: "",
    };

    submitSignin = async (e) => {
        e.preventDefault();
        this.setState({
          emailError: "",
          passwordError: "",
          failedLoginError: "",
        })
        if (this.validate()) {
            await axios
                .put("http://localhost:4000/users/signin", {
                    email: this.state.email,
                    password: this.state.password,
                })
                .then((res) => {
                    console.log(res);
                })
                .catch(() => {
                    this.setState({
                        failedLoginError: "Email and password did not match",
                    });
                });
        }
    };

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    validate() {
        let emailError = "";
        let passwordError = "";
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!this.state.email || reg.test(this.state.email) === false) {
            emailError = "Email is Invalid ";
        }
        if (!this.state.password) {
            passwordError = "Password is required";
        }
        if (emailError || passwordError) {
            this.setState({ emailError, passwordError });
            return false;
        }
        return true;
    }

    render() {
        return (
            <div>
                <div id="signin-container"></div>
                <div id="signin-div">
                    <h2>Sign in</h2>

                    <Form id="signin-form">
                        <p className="text-danger error-message">
                            {this.state.emailError}
                        </p>
                        <Form.Control
                            id="email"
                            type="text"
                            placeholder="Email"
                            className="me-2"
                            aria-label="Email"
                            onChange={this.onChange}
                        />
                        <p className="text-danger error-message">
                            {this.state.passwordError}
                        </p>
                        <Form.Control
                            id="password"
                            type="password"
                            placeholder="Password"
                            className="me-2"
                            aria-label="Password"
                            onChange={this.onChange}
                        />
                        <p className="text-danger error-message" style={{ textAlign: "center" }}>
                            {this.state.failedLoginError}
                        </p>
                        <Button
                            onClick={this.submitSignin}
                            id="signin-button"
                            variant="outline-info"
                        >
                            Sign In
                        </Button>
                    </Form>
                    <p style={{ margin: 0 }}>
                        <a
                            style={{ color: "#13caf0" }}
                            href="http://localhost:3000/signup"
                        >
                            Create an account
                        </a>
                    </p>
                </div>
            </div>
        );
    }
}
