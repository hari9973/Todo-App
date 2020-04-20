import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Todo from "./components/Todo";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Todo />
      </div>
    </Provider>
  );
}

export default App;
