import React, {Component} from 'react';
import {Card, CardImg, CardBody, CardTitle, CardText} from 'reactstrap';

class Dishdetail extends Component {
    constructor(props){
        super(props);
    }

    renderComments(comments){
        if (comments != null){
            var fmt = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: 'numeric'});
            const commentBody = comments.map((c)=>{
                var date = new Date(c.date);
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

    renderDish(dish){
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

    render(){
        if (this.props.selectedDish != null){
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.selectedDish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.selectedDish.comments)}
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}

export default Dishdetail;