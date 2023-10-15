import {
    CREATE_POST,
    RETRIEVE_POSTS,
    UPDATE_POST,
    DELETE_POST,
    DELETE_ALL_POSTS,
  } from "../actions/types";
  
  const initialState = [];
  
  function postReducer(POSTs = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_POST:
        return [...POSTs, payload];
  
      case RETRIEVE_POSTS:
        return payload;
  
      case UPDATE_POST:
        return POSTs.map((POST) => {
          if (POST.id === payload.id) {
            return {
              ...POST,
              ...payload,
            };
          } else {
            return POST;
          }
        });
  
      case DELETE_POST:
        return POSTs.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_POSTS:
        return [];
  
      default:
        return POSTs;
    }
  };
  
  export default postReducer;