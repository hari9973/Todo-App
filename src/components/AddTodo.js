import React from "react";
import { handleModel } from "../redux";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import CustomModel from "./CustomModel";

const AddTodo = ({ modelState, handleModel }) => {
  return (
    <div>
      <Button
        className="button"
        style={{ backgroundColor: "#337ab7", cursor: "pointer" }}
        onClick={() =>
          handleModel({ modalStatus: !modelState, type: "create" })
        }
        id="sticky"
      >
        <img src={require("../static/plus.png")} alt="plus" /> Compose
      </Button>
      {modelState && <CustomModel />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    modelState: state.isModelOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleModel: (modelState) => dispatch(handleModel(modelState)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
