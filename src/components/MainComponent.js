import React, { Component } from 'react';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import SelectedDish from './SelectedDish';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchPromos, fetchComments } from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

//used to map various dispather actions to props

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) => { dispatch(postComment(dishId, rating, author, comment)) },
    fetchDishes: () => { dispatch(fetchDishes()) },
    fetchComments: () => { dispatch(fetchComments()) },
    fetchPromos: () => { dispatch(fetchPromos()) },
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
})

class Main extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }

    render() {

        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured === true)[0]}
                    dishLoading={this.props.dishes.isLoading}
                    dishErrMsg={this.props.dishes.errMsg}
                    promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured === true)[0]}
                    promotionLoading={this.props.promotions.isLoading}
                    promotionErrMsg={this.props.promotions.errMsg}
                    leader={this.props.leaders.filter((leader) => leader.featured === true)[0]}
                />
            );
        }

        const DishWithId = ({ match }) => {
            return (
                <SelectedDish
                    dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    dishLoading={this.props.dishes.isLoading}
                    dishErrMsg={this.props.dishes.errMsg}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    commentsErrMsg={this.props.comments.errMsg}
                    postComment={this.props.postComment}
                />
            );
        }

        const AboutUs = () => {
            return (
                <About leaders={this.props.leaders} />
            );
        }

        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path="/home" component={HomePage} />
                            <Route exact path="/contactus" component={() => <Contact resetForm={this.props.resetFeedbackForm}/>} />
                            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes.dishes} isLoading={this.props.dishes.isLoading} errMsg={this.props.dishes.errMsg}/>} />
                            <Route path="/menu/:dishId" component={DishWithId} />
                            <Route path="/aboutus" component={AboutUs} />
                            <Redirect to="/home" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
