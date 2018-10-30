import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }
  handleSubmit(values) {
    console.log('Current State is: ' + JSON.stringify(values));
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  render() {
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
    return (
      <React.Fragment>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Col sm={12}>
                  <Label htmlFor="rating">Rating</Label>
                </Col>
                <Col sm={12}>
                  <Control.select model=".rating" id="rating" name="rating" className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Col sm={12}>
                  <Label htmlFor="author">Your Name</Label>
                </Col>
                <Col sm={12}>
                  <Control.text model=".author" id="author" name="author"
                    className="form-control"
                    placeholder="Your Name"
                    validators={{ minLength: minLength(3), maxLength: maxLength(15) }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      minLength: "Must be greater than 2 characters ",
                      maxLength: "Must be 15 characters or less "
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col sm={12}>
                  <Label htmlFor="comment">Comment</Label>
                </Col>
                <Col sm={12}>
                  <Control.textarea model=".comment" id="comment" name="comment"
                    rows="6"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Button type="submit" value="submit" color="primary">Submit</Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
        <Button outline onClick={this.toggleModal}><span className="fa fa-pencil"> Submit Comment</span></Button>
      </React.Fragment>
    );
  }
}

function RenderComments({ comments, postComment, dishId }) {
  if (comments != null) {
    var fmt = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
    return (
      <div>
        <h4>Comments</h4>
        <Stagger in>
          {comments.map((c) => {
            var date = new Date(Date.parse(c.date));
            return (
              <Fade in>
                <li key={c.id}>
                  <p>{c.comment}</p>
                  <p>-- {c.author} , {fmt.format(date)}</p>
                </li>
              </Fade>
            )
          })}
        </Stagger>
        <CommentForm dishId={dishId} postComment={postComment} />
      </div>
    );
  } else {
    return (
      <div></div>
    );
  }

}

function RenderDish({ dish }) {
  return (
    <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </FadeTransform>
  )
}

const Dishdetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div></div>
    );
  }
}

export default Dishdetail;