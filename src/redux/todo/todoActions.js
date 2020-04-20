import { sampleData } from "../../sample";
import {
  FETCH_TODOS,
  FETCH_TODOS_SUCCESS,
  TOGGLE_MODEL,
  ADD_TODO,
  TOGGLE_TAB,
  SAVING,
  UPDATE_TODO,
  DELETE_TODO,
  CHANGE_STATUS,
} from "./todoTypes";

const fetchRequest = () => {
  return {
    type: FETCH_TODOS,
  };
};

const fetchTodosSuccess = (todos) => {
  return {
    type: FETCH_TODOS_SUCCESS,
    payload: todos,
  };
};

/*const fetchTodosFailure = (error) => {
  return {
    type: FETCH_TODOS_FAILURE,
    payload: error,
  };
};*/

export const fetchTodos = () => {
  return (dispatch) => {
    dispatch(fetchRequest());
    setTimeout(() => {
      const todos = sampleData;
      dispatch(fetchTodosSuccess(todos));
    }, 3000);
  };
};

export const handleModel = (modelState) => {
  return {
    type: TOGGLE_MODEL,
    payload: modelState,
  };
};

const saving = (state) => {
  return {
    type: SAVING,
    payload: state,
  };
};

const addTodo = (todo) => {
  return {
    type: ADD_TODO,
    payload: todo,
  };
};

export const createNewTodo = (todo) => {
  return (dispatch) => {
    dispatch(saving(true));
    setTimeout(() => {
      dispatch(addTodo(todo));
      dispatch(saving(false));
      dispatch(handleModel({ modalStatus: false, type: "create" }));
    }, 5000);
  };
};

const update = (todo) => {
  return {
    type: UPDATE_TODO,
    payload: todo,
  };
};

export const updateTodo = (todo) => {
  return (dispatch) => {
    dispatch(saving(true));
    setTimeout(() => {
      dispatch(update(todo));
      dispatch(saving(false));
      dispatch(handleModel({ modalStatus: false, type: "update" }));
    }, 5000);
  };
};

export const changeTab = (tab) => {
  return {
    type: TOGGLE_TAB,
    payload: tab,
  };
};

export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    payload: id,
  };
};

export const changeStatus = (id) => {
  return {
    type: CHANGE_STATUS,
    payload: id,
  };
};
