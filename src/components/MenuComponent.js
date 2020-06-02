import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import {BaseUrl} from '../shared/baseUrl';

//functional component
function RenderMenuItem({ dish }) {
    
    return (
        <Card key={dish.id}>
            <Link to={`/menu/${dish.id}`}>
                <CardImg width="100%" src={BaseUrl + dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle className="dishName">{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

const Menu = (props) => {

    const menu = props.dishes.map((dish) => {
        return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem dish={dish} />
            </div>
        );
    })

    if(props.isLoading) {
        return (
            <div className="container">
                <Loading />
            </div>
        );
    }
    else if( props.errMsg ) {
        return (
            <div className="container">
                <h4>{props.errMsg}</h4>
            </div>
        );
    }
    else
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 m-1">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Menu</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr></hr>
                    </div>
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
}

export default Menu;