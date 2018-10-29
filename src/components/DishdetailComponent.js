import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

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
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
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

function RenderComments({ comments, addComment, dishId }) {
  if (comments != null) {
    var fmt = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
    const commentBody = comments.map((c) => {
      var date = new Date(Date.parse(c.date));
      return (
        <ul className="list-unstyled" key={c.id}>
          <li>{c.comment}</li>
          <li>-- {c.author} , {fmt.format(date)}</li>
        </ul>
      )
    });
    return (
      <div>
        <h4>Comments</h4>
        {commentBody}
        <CommentForm dishId={dishId} addComment={addComment}/>
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
    <Card>
      <CardImg top src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  )
}

const Dishdetail = (props) => {
  if (props.dish != null) {
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
            <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id}/>
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