import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Form, FormGroup, Label, Col, Input, Button, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';

class Contact extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: '',
            agree: false,
            contactType: 'Tel.',
            message: '',
            touched: {
                firstname: false,
                lastname: false,
                email: false,
                telnum: false
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        alert(JSON.stringify(this.state));
        event.preventDefault();
    }

    handleBlur = (event) => {
        const target = event.target;
        const name = target.name;

        this.setState({
            touched: {
                ...this.state.touched,
                [name]: true
            }
        })
    }

    validate(firstname, lastname, telnum, email) {
        let error = {
            firstname: '',
            lastname: '',
            email: '',
            telnum: ''
        }
        if (this.state.touched.firstname && firstname.length < 3)
            error.firstname = "First name size must be >= 3";
        else if (this.state.touched.firstname && firstname.length > 10)
            error.firstname = "First name size must be <= 10";
        if (this.state.touched.lastname && lastname.length < 3)
            error.lastname = "Last name size must be >= 3";
        else if (this.state.touched.lastname && lastname.length > 10)
            error.lastname = "Last name size must be <= 10";

        const regex = /^\d{10}$/;
        if (this.state.touched.telnum && !regex.test(telnum))
            error.telnum = "Telephone number should contain 10 digit only";

        if (this.state.touched.email && email.split('').filter((x) => x === '@').length !== 1)
            error.email = "Email format should have exactly one '@'";

        return error;
    }

    render() {
        const error = this.validate(this.state.firstname, this.state.lastname, this.state.telnum, this.state.email);

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 m-1">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr></hr>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label for="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="text" name="firstname" id="firstname"
                                        placeholder="First Name"
                                        value={this.state.firstname}
                                        valid={error.firstname === ""}
                                        invalid={error.firstname !== ""}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur} />
                                    <FormFeedback>{error.firstname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" name="lastname" id="lastname"
                                        placeholder="Last Name"
                                        value={this.state.lastname}
                                        valid={error.lastname === ""}
                                        invalid={error.lastname !== ""}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur} />
                                    <FormFeedback>{error.lastname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="telnum" md={2}>Tel Num.</Label>
                                <Col md={10}>
                                    <Input type="tel" name="telnum" id="telnum"
                                        placeholder="Tel. Number"
                                        value={this.state.telnum}
                                        valid={error.telnum === ""}
                                        invalid={error.telnum !== ""}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur} />
                                    <FormFeedback>{error.telnum}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" name="email" id="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        valid={error.email === ""}
                                        invalid={error.email !== ""}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur} />
                                    <FormFeedback>{error.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 6, offset: 2 }}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="agree" id="agree" checked={this.state.agree}
                                                onChange={this.handleChange} />{' '}
                                            <stong>May we contact you?</stong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{ size: 3, offset: 1 }}>
                                    <Input type="select" name="contactType" id="contactType" value={this.state.contactType}
                                        onChange={this.handleChange}>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="message" md={2}>Give Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" name="message" id="message"
                                        rows="12"
                                        value={this.state.message}
                                        onChange={this.handleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;