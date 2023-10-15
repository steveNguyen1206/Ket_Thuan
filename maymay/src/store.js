import { configureStore} from '@reduxjs/toolkit';
import tutorialReducer from './reducers/tutorials';
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import postReducer from './reducers/posts';

const initialState = {};

const reducer = {
    posts: postReducer,
    tutorials: tutorialReducer,
    auth: authReducer,
    message: messageReducer
}

const store = configureStore({ 
    reducer: reducer, 
    middleware:  (getDefaultMiddleware) => getDefaultMiddleware(),
    initialState})
export default store;