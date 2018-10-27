import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';

class Menu extends Component {
    constructor(props){
        super(props);
        console.log('Menu Component constructor is invoked');
    }

    componentDidMount(){
        console.log('Menu Component componentDidMount is invoked');
    }

    render(){
        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={()=>this.props.onClick(dish.id)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        console.log('Menu Component render is invoked');
        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>                
            </div>
        );
    }
}

export default Menu;