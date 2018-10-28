import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

function RenderComments({ comments }) {
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
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.dish.comments} />
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