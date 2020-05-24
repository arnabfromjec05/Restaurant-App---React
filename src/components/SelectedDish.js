import React,{Component} from "react";
import { Card, CardImg, CardTitle, CardBody, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, Label, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';


const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

function RenderDish({ dish }) {
    return (
        <Card>
            <CardImg top width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        this.toggleModal();

        //dispatch addComment action to the redux store
        this.props.addComment(this.props.dishId, values.userRating, values.userName, values.userComment);
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
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label for="userName">Your Name</Label>
                                <Control.text model=".userName" name="userName" id="userName" placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        minLength: minLength(3), maxLength: maxLength(15)
                                    }} />
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
                                    className="form-control" />
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


function RenderComments({ comments, addComment, dishId}) {
    const retComments = comments.map((comment) => {
        return (
            <div key={comment.id}>
                <p>{comment.comment}</p>
                <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
            </div>
        );
    });
    return (
        <div>
            <div>{retComments}</div>
            <div>
                <CommentForm addComment={addComment} dishId={dishId}/>
            </div>
        </div>
    );
}

const SelectedDish = (props) => {

    if (props.dish == null) {
        return <div></div>;
    }
    else {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 m-1">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr></hr>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <RenderComments comments={props.comments} 
                            addComment={props.addComment}
                            dishId={props.dish.id}/>
                    </div>
                </div>
            </div>
        );

    }
}

export default SelectedDish;