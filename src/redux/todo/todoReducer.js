import {
  FETCH_TODOS,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  TOGGLE_MODEL,
  ADD_TODO,
  TOGGLE_TAB,
  SAVING,
  UPDATE_TODO,
  DELETE_TODO,
  CHANGE_STATUS,
} from "./todoTypes";

const initialState = {
  isLoading: false,
  todos: [],
  error: "",
  len: "",

  isModelOpen: false,
  selectedTodo: [],
  isSaving: false,
  modalType: "",

  tab: "All Tasks",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: action.payload,
        len: action.payload.length,
      };
    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case TOGGLE_MODEL:
      let selectTodo = action.payload.todo || [];
      return {
        ...state,
        isModelOpen: action.payload.modalStatus,
        modalType: action.payload.type,
        selectedTodo: selectTodo,
      };
    case TOGGLE_TAB:
      return {
        ...state,
        tab: action.payload,
      };
    case SAVING:
      return {
        ...state,
        isSaving: action.payload,
      };
    case ADD_TODO:
      let data = [...state.todos];
      action.payload["id"] = state.len + 1;
      action.payload["createdAt"] = new Date().toISOString().slice(0, 10);
      data.push(action.payload);
      return {
        ...state,
        todos: data,
        len: state.len + 1,
      };
    case UPDATE_TODO:
      let data1 = [...state.todos];
      for (let i = 0; i < data1.length; i++)
        if (data1[i].id === action.payload.id) data1[i] = action.payload;
      return {
        ...state,
        todos: data1,
      };
    case DELETE_TODO:
      let data2 = [...state.todos];
      for (let i = 0; i < data2.length; i++)
        if (data2[i].id === action.payload) data2.splice(i, 1);
      return {
        ...state,
        todos: data2,
      };
    case CHANGE_STATUS:
      let data3 = [...state.todos];
      for (let i = 0; i < data3.length; i++)
        if (data3[i].id === action.payload)
          data3[i].currentState =
            data3[i].currentState === "open" ? "close" : "open";
      return {
        ...state,
        todos: data3,
      };
    default:
      return state;
  }
};

export default reducer;
