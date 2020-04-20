import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchTodos } from "../redux";
import AddTodo from "./AddTodo";
import DisplayBlock from "./DisplayBlock";

const Todo = ({ fetchTodos, isLoading }) => {
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);
  return (
    <React.Fragment>
      {isLoading ? (
        <div className="custom-modal">
          <img src={require("../static/load1.gif")} alt="loading" />
          <h2>Loading Todos.....</h2>
        </div>
      ) : (
        <React.Fragment>
          <DisplayBlock />
          <AddTodo />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTodos: () => dispatch(fetchTodos()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
