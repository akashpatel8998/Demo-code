import { SET_USER, EDIT_USER, DELETE_USER, ADD_USER } from '../../actions/actionType';

let initalState = {
  data: []
};

const userStore = (state = initalState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        data: action.payload
      };

    case ADD_USER:
      const personList = [...state.data];
      personList.push(action.payload);
      return {
        ...state,
        data: personList
      }

    case EDIT_USER:
      const dataUpdate = [...state.data];
      const updatedPersonDetails = state.data.findIndex((item) => item.id === action.payload.id);
      dataUpdate[updatedPersonDetails] = action.payload;
      return {
        ...state,
        data: dataUpdate
      }
      
    case DELETE_USER:
      const userList = [...state.data];
      const updatedUser = userList.filter((item) => item.id !== action.payload);
      return {
        ...state,
        data: updatedUser
      }

    default:
      return state;
  }
};

export default userStore;
