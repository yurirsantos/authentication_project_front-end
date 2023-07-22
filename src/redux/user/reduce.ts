import ActionsUserType from "./actionTypes";

const initialState = {
  user: null,
  token: null,
  typeUser: null,
  restaurant: null
}

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionsUserType.LOGIN:
      return {
        ...state, user: action.payload, token: action.token, typeUser: action.typeUser, restaurant: action.restaurant,
      }

    case ActionsUserType.LOGOUT:
      return {
        ...state, user: initialState.user, token: initialState.token, typeUser: initialState.typeUser, restaurant: initialState.restaurant
      }

    default:
      return state;
  }

};

export default userReducer;