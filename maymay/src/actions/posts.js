import {
    CREATE_POST,
    RETRIEVE_POSTS,
    UPDATE_POST,
    DELETE_POST,
    DELETE_ALL_POSTS,
  } from "./types";
  
  import POSTDataService from "../services/post.services";
  
  export const createPost = (title, postBody, hashtag, url, user) => async (dispatch) => {
    try {
      const res = await POSTDataService.create({ title, postBody, hashtag, url, user });
  
      dispatch({
        type: CREATE_POST,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrievePosts = () => async (dispatch) => {
    try {
      const res = await POSTDataService.getAll();
      // console.log(res.data)
      dispatch({
        type: RETRIEVE_POSTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err); 
    }
  };
  
  export const updatePost = (id, data) => async (dispatch) => {
    try {
      const res = await POSTDataService.update(id, data);
  
      dispatch({
        type: UPDATE_POST,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deletePost = (id) => async (dispatch) => {
    try {
      await POSTDataService.delete(id);
  
      dispatch({
        type: DELETE_POST,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllPosts = () => async (dispatch) => {
    try {
      const res = await POSTDataService.deleteAll();
      
      dispatch({
        type: DELETE_ALL_POSTS,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const findPostsByTitle = (title) => async (dispatch) => {
    try {
      const res = await POSTDataService.findByTitle(title);
      console.log(res)
      dispatch({
        type: RETRIEVE_POSTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };