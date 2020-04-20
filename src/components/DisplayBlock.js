import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AllTasks from "./AllTasks";
import Completed from "./Completed";
import Pending from "./Pending";
import { changeTab } from "../redux";

const DisplayBlock = ({ tab, changeTab }) => {
  return (
    <Router>
      <div>
        <nav>
          <Link
            to="/"
            className={tab === "All Tasks" ? "active" : null}
            onClick={() => changeTab("All Tasks")}
          >
            All Tasks
          </Link>
          <Link
            to="/completed"
            className={tab === "completed" ? "active" : null}
            onClick={() => changeTab("completed")}
          >
            Completed
          </Link>
          <Link
            to="/pending"
            className={tab === "pending" ? "active" : null}
            onClick={() => changeTab("pending")}
          >
            Pending
          </Link>
        </nav>
        <Switch>
          <Route exact path="/">
            <AllTasks />
          </Route>
          <Route path="/completed">
            <Completed />
          </Route>
          <Route path="/pending">
            <Pending />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    tab: state.tab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeTab: (tab) => dispatch(changeTab(tab)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayBlock);
