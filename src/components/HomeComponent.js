import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { Loading } from './LoadingComponent';
import {BaseUrl} from '../shared/baseUrl';


function RenderCard({ item, isLoading, errMsg}) {
    if(isLoading) {
        return (
            <div className="container">
                <Loading />
            </div>
        );
    }
    else if( errMsg ) {
        return (
            <div className="container">
                <h4>{errMsg}</h4>
            </div>
        );
    }
    else
        return (
            <Card>
                <CardImg top width="100%" src={BaseUrl + item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        );
}

function Home(props) {

    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} isLoading={props.dishLoading} errMsg={props.dishErrMsg}/>
                </div> 
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} isLoading={props.promotionLoading} errMsg={props.promotionErrMsg} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} />
                </div>
            </div>
        </div>
    );

}

export default Home;
