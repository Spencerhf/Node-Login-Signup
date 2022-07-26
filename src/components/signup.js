import { React, Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class Signup extends Component {
    state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        nameError: "",
        emailError: "",
        passwordError: "",
        failedSignupError: "",
    };

    submitSignup = async (e) => {
        e.preventDefault();
        this.setState({
            nameError: "",
            emailError: "",
            passwordError: "",
            failedSignupError: "",
        });

        if (this.validate()) {
            await axios
                .post("http://localhost:4000/users/signup", {
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    email: this.state.email,
                    password: this.state.password,
                })
                .then((res) => {
                    console.log(res);
                })
                .catch(() => {
                    this.setState({
                        failedSignupError: "Something went wrong...",
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
        let nameError = "";
        let emailError = "";
        let passwordError = "";
        if (!this.state.first_name || !this.state.last_name) {
            nameError = "First and last name required";
        }
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!this.state.email || reg.test(this.state.email) === false) {
            emailError = "Email is Invalid ";
        }
        if (!this.state.password) {
            passwordError = "Password is required";
        }
        if (emailError || nameError || passwordError) {
            this.setState({
                nameError,
                emailError,
                passwordError,
            });
            return false;
        }
        return true;
    }

    render() {
        return (
            <div>
                <div id="signin-container"></div>
                <div id="signup-div">
                    <h2>Create an Account</h2>

                    <Form id="signin-form">
                        <p className="text-danger error-message">
                            {this.state.nameError}
                        </p>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "30px",
                            }}
                        >
                            <Form.Control
                                id="first_name"
                                type="text"
                                placeholder="First Name"
                                aria-label="First Name"
                                onChange={this.onChange}
                            />
                            <Form.Control
                                id="last_name"
                                type="text"
                                placeholder="Last Name"
                                aria-label="Last Name"
                                onChange={this.onChange}
                            />
                        </div>
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
                        <p className="text-danger error-message">
                            {this.state.failedSignupError}
                        </p>
                        <Button
                            onClick={this.submitSignup}
                            id="signin-button"
                            variant="outline-info"
                        >
                            Create Account
                        </Button>
                    </Form>

                    <p style={{ margin: 0 }}>
                        <a
                            style={{ color: "#13caf0" }}
                            href="http://localhost:3000/signin"
                        >
                            Sign In
                        </a>
                    </p>
                </div>
            </div>
        );
    }
}
