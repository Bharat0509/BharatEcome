import { CLEAR_ERRORS, CLEAR_TOKEN_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, SET_TOKEN_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_RESET, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_RESET, UPDATE_PROFILE_SUCCESS } from '../constants/userContants'
export const userReducer = (state = {user: {}} , action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOAD_USER_REQUEST:
    
      return {
        loading: true,
        isAuthenticated: false
      }
  case LOGIN_SUCCESS:
  case REGISTER_SUCCESS:
  case LOAD_USER_SUCCESS:
    return {
        ...state,
        loading:false,
        isAuthenticated:true,
        user:action.payload,

    }

    case LOGIN_FAIL:
    case REGISTER_FAIL:
    
    return {
        ...state,
        loading:false,
        isAuthenticated:false,
        user:null,
        error:action.payload

    }
    case LOAD_USER_FAIL:
       return {
        ...state,
        loading:false,
        isAuthenticated:false,
        user:action.payload,

    }

    case CLEAR_ERRORS:
    return {
        ...state,
        loading:false,
        isAuthenticated:false,
        user:null,
        error:null

    }
    case LOGOUT_SUCCESS:
      return {
        loading:false,
        user:null,
        isAuthenticated:false
      }
    case LOGOUT_FAIL:
      return {
        ...state,
        loading:false,
        error:action.payload,
      }
    default:
        return state;
  }
}




export const profileReducer = (state = {user: {}} , action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      }
  case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
  
    return {
        ...state,
        loading:false,
        
        isUpdated:action.payload,

    }

    case UPDATE_PROFILE_FAIL:
      case UPDATE_PASSWORD_FAIL:
    
    return {
        ...state,
        loading:false,

        error:action.payload

    }

    case LOAD_USER_FAIL:
      
       return {
        ...state,
        loading:false,
        isAuthenticated:true,
        user:action.payload,

    }
    case UPDATE_PROFILE_RESET:
      case UPDATE_PASSWORD_RESET:
      return{
        ...state,
        isUpdated:false
      }
    default:
        return state;
  }
}



export const tokenReducer = (state = {token:''} , action) => {
  
  switch(action.type){

   case SET_TOKEN_SUCCESS:
   
    return {
        token:action.payload

    }
    case CLEAR_TOKEN_SUCCESS:
      return {
        token:null
      }
    default:
        return state;
  
}
}