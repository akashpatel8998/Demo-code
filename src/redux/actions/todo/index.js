import * as actionType from '../actionType';

export const setUser = (data) => {
  return {
    type: actionType.SET_USER,
    payload: data
  };
};

export const addUser = (data) => {
  return {
    type: actionType.ADD_USER,
    payload: data
  };
};

export const deleteUser = (data) => {
  return {
    type: actionType.DELETE_USER,
    payload: data
  };
}

export const editUser = (data) => {
  return {
    type: actionType.EDIT_USER,
    payload: data
  };
}

export const getUser = (data) => {
  return {
    type: actionType.GET_USER,
    payload: data
  };
};
