import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { handleModel, createNewTodo, updateTodo, deleteTodo } from "../redux";

const initialState = {
  title: "",
  description: "",
  priority: "none",
  dueDate: "",
  createdAt: "",
  currentState: "open",
};

const CustomModel = ({
  modelState,
  handleModel,
  data = initialState,
  type,
  createNewTodo,
  isSaving,
  updateTodo,
  deleteTodo,
}) => {
  const [task, setTask] = useState(data);
  const escFunction = (event) => {
    if (event.keyCode === 27) handleModel({ modalStatus: false, type: type });
  };
  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
  });
  return (
    <div
      className="custom-modal"
      id="md"
      style={modelState ? { display: "block" } : { display: "none" }}
    >
      <div className="custom-modal-container">
        <div className="custom-modal-header">
          {type.toUpperCase() + " TODO"}
          <button
            type="button"
            className="exit-btn"
            onClick={() => handleModel({ modalStatus: false, type: type })}
          >
            &times;
          </button>
          <hr />
        </div>

        <div className="custom-modal-body">
          {type === "delete" ? (
            <h2>Are you sure</h2>
          ) : (
            <form>
              <label>Summary: </label>
              <input
                type="text"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                disabled={type === "view" ? true : false}
              />
              <br />
              <br />
              <label style={{ float: "left" }}>Description: </label>
              <textarea
                value={task.description}
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
                disabled={type === "view" ? true : false}
              />
              <br />
              <br />
              <div
                style={{ width: "50%", float: "left" }}
                onChange={(e) => setTask({ ...task, priority: e.target.value })}
              >
                <label>Priority: </label>
                {type === "view" ? (
                  task.priority
                ) : (
                  <React.Fragment>
                    <input
                      type="radio"
                      name="priority"
                      value="none"
                      defaultChecked
                    />
                    <label>None</label>&nbsp;
                    <input type="radio" name="priority" value="low" />
                    <label>Low</label>&nbsp;
                    <input type="radio" name="priority" value="medium" />
                    <label>Medium</label>&nbsp;
                    <input type="radio" name="priority" value="high" />
                    <label>High</label>
                  </React.Fragment>
                )}
              </div>
              <div style={{ width: "50%", float: "right" }}>
                <label>Due Date: </label>
                <input
                  type="date"
                  value={task.dueDate}
                  disabled={type === "view" ? true : false}
                  onChange={(e) =>
                    setTask({ ...task, dueDate: e.target.value })
                  }
                />
              </div>
              {type === "view" ? (
                <React.Fragment>
                  <br />
                  <br />
                  <label>Created On: {data.createdAt}</label>
                  <br />
                  <br />
                  <label>Status: {data.currentState}</label>
                </React.Fragment>
              ) : null}
            </form>
          )}
        </div>
        <div className="custom-modal-footer">
          <hr />
          {type === "delete" ? (
            <React.Fragment>
              <input
                type="button"
                className="button"
                onClick={() => handleModel(false)}
                value="NO"
              />
              <input
                type="button"
                className="button"
                value="Submit"
                onClick={() => {
                  deleteTodo(task.id);
                  handleModel({ modalStatus: false, type: "delete" });
                }}
                style={{ backgroundColor: "#008cba" }}
              />
            </React.Fragment>
          ) : type === "view" ? null : (
            <React.Fragment>
              <input
                type="button"
                className="button"
                onClick={() => handleModel(false)}
                value="Close"
              />
              {isSaving ? (
                <button
                  className="button"
                  type="button"
                  style={{ backgroundColor: "#008cba" }}
                >
                  <img src={require("../static/load2.gif")} alt="loading" />
                  Saving...
                </button>
              ) : (
                <input
                  type="button"
                  className="button"
                  value="Save"
                  style={{ backgroundColor: "#008cba" }}
                  onClick={() => {
                    type === "create" ? createNewTodo(task) : updateTodo(task);
                  }}
                />
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    modelState: state.isModelOpen,
    type: state.modalType,
    isSaving: state.isSaving,
    data: state.selectedTodo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleModel: (modelState) => dispatch(handleModel(modelState)),
    createNewTodo: (todo) => dispatch(createNewTodo(todo)),
    updateTodo: (todo) => dispatch(updateTodo(todo)),
    deleteTodo: (id) => dispatch(deleteTodo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomModel);
