import { SET_USER_DATA, CLEAR_USER_DATA } from "./action";

const initialState = {
    userName:null,
    Role:null,
};

const userReducer = (state = initialState, action) => {

  switch (action.type) {
    
    case SET_USER_DATA:
      return {
        ...state,
        userName:action.payload.userName,
        Role: action.payload.Role,
      };
    
      case CLEAR_USER_DATA:
      return {
        ...state,
        userName:null,
        Role:null,
      };
    
      default:
      return state;
  }
};


export default userReducer;