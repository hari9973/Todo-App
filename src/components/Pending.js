import React from "react";
import { connect } from "react-redux";
import { handleModel, changeStatus } from "../redux";

const Pending = ({ data, handleModel, changeStatus }) => {
  return (
    <React.Fragment>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Summary</th>
            <th scope="col">Priority</th>
            <th scope="col">Created On</th>
            <th scope="col">Due Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((todo) =>
            todo.currentState === "open" ? (
              <tr key={todo.id}>
                <td
                  onClick={() =>
                    handleModel({ modalStatus: true, type: "view", todo: todo })
                  }
                  style={{ cursor: "pointer" }}
                >
                  {todo.title}
                </td>
                <td>{todo.priority}</td>
                <td>{todo.createdAt}</td>
                <td>{todo.dueDate}</td>
                <td>
                  <button
                    onClick={() =>
                      handleModel({
                        modalStatus: true,
                        type: "update",
                        todo: todo,
                      })
                    }
                  >
                    <img src={require("../static/edit.png")} alt="edit" />
                  </button>
                  <button
                    onClick={() =>
                      handleModel({
                        modalStatus: true,
                        type: "delete",
                        todo: todo,
                      })
                    }
                  >
                    <img src={require("../static/trash.png")} alt="delete" />
                  </button>
                  <button onClick={() => changeStatus(todo.id)}>
                    <img
                      src={
                        todo.currentState === "close"
                          ? require("../static/re-open.png")
                          : require("../static/done.png")
                      }
                      alt={todo.currentState === "close" ? "re-open" : "Done"}
                    />
                  </button>
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.todos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleModel: (modelState) => dispatch(handleModel(modelState)),
    changeStatus: (id) => dispatch(changeStatus(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pending);
