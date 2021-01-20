import React, { useEffect, useState, useContext } from "react";
import { useImmer } from "use-immer";
import Axios from "axios";
import DispatchContext from "../DispatchContext";

function HeaderLoggedOut(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [state, setState] = useImmer({
    invalidPassword: false,
    invalidUsername: false
  });

  const appDispatch = useContext(DispatchContext);

  async function handleLogin() {
    try {
      const response = await Axios.post("/login", {
        username,
        password
      });
      if (response.data) {
        appDispatch({ type: "login", data: response.data });
        appDispatch({
          type: "flashMessage",
          value: "You have successfully logged in"
        });
      } else {
        console.log("incorrect username/password");
        appDispatch({
          type: "flashMessage",
          value: "Invalid username/password",
          color: "alert-danger"
        });
      }
    } catch (e) {
      console.log("Error", e.response.data);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (password && username) {
      handleLogin();
    } else {
      setState(draft => {
        draft.invalidPassword = !password ? true : false;
        draft.invalidUsername = !username ? true : false;
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            onChange={e => setUsername(e.target.value)}
            name="username"
            className={
              "form-control form-control-sm input-dark " +
              (state.invalidUsername ? "is-invalid" : "")
            }
            type="text"
            placeholder="Username"
            autoComplete="off"
          />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            onChange={e => setPassword(e.target.value)}
            name="password"
            className={
              "form-control form-control-sm input-dark " +
              (state.invalidPassword ? "is-invalid" : "")
            }
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  );
}

export default HeaderLoggedOut;
