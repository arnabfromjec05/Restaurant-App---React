import * as ActionTypes from './ActionTypes';
import {BaseUrl} from '../shared/baseUrl';

//the inside object is called Action Object having a type field and a payload

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

//this is the thunk as it returns a function

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(BaseUrl+"dishes")
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    console.log('Error :'+response.status);
                }
            })
            .then(dishes => dispatch(addDishes(dishes)))
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
})

export const dishesFailed = (errmsg) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmsg
})

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})

export const fetchComments = () => (dispatch) => {

    return fetch(BaseUrl+"comments")
            .then(response => response.json())
            .then(comments => dispatch(addComments(comments)))
}

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})

export const commentsFailed = (errmsg) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmsg
})

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(BaseUrl+"promotions")
            .then(response => response.json())
            .then(promos => dispatch(addPromos(promos)))
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
})

export const promosFailed = (errmsg) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmsg
})

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
})
