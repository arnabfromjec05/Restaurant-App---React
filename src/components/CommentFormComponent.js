//The Component is already added to the SelectedDish component


import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Label, Row} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !val || val.length<=len;
const minLength = (len) => (val) => val && val.length>=len;

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state={
            isModalOpen: false
        }

        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        console.log(JSON.stringify(values));
        alert(JSON.stringify(values));
        this.toggleModal();
    }

    render() {
        return (
            <React.Fragment>
                <Button outline color="secondary" onClick={this.toggleModal}>
                    <span className="fa fa-pencil"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody className="commentFormModal">
                        <LocalForm onSubmit={(val) => this.handleSubmit(val)}>
                            <Row className="form-group">
                                <Label for="userRating">Rating</Label>
                                <Control.select model=".userRating" name="userRating" 
                                    id="userRating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label for="userName">Your Name</Label>
                                <Control.text model=".userName" name="userName" id="userName" placeholder="Your Name" 
                                    className="form-control"
                                    validators = {{
                                        minLength: minLength(3) , maxLength: maxLength(15)
                                    }}/>
                                <Errors
                                    className="text-danger"
                                    model=".userName"
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Label for="userComment">Comment</Label>
                                <Control.textarea model=".userComment" name="userComment" id="userComment"
                                    rows="6"
                                    className="form-control"/>
                            </Row>
                            <Row className="form-group">
                                <Button color="primary">Submit</Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default CommentForm; 