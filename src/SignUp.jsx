import React from 'react';

import reducer from './reducer';

const initial_state = {
  username: '',
  password: '',
  password1: '',
};

export default function SignUp() {
  const [state, dispatch] = React.useReducer(reducer, initial_state);
  const title = React.useRef();

  const handleSignUp = () => {
    if (!state.username || !state.password || !state.password1) {
      window.alert('请完整填写所需信息');
      return;
    }
    if (state.password !== state.password1) {
      window.alert('两次输入的密码不一致');
      return;
    }
    window
      .fetch('/api/sign-up', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(state),
      })
      .then((response) => {
        if (response.status === 200) {
          window.location = '/sign-in';
        } else {
          window.alert('服务器错误');
          return;
        }
      });
  };

  React.useEffect(() => {
    window
      .fetch('/api/info')
      .then((response) => response.json())
      .then((data) => {
        title.current.innerText = data.title;
      });
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="container-xl">
        <h1 ref={title}>&nbsp;</h1>
        <hr />
      </header>

      <main className="d-flex flex-grow-1 align-items-center justify-content-center container-xl">
        <div className="card col-4 col-xl-3 shadow">
          <div className="card-header">
            <h4>新用户</h4>
          </div>

          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">用户名</label>
              <input
                type="text"
                value={state.username}
                className="form-control"
                onChange={(event) =>
                  dispatch({ type: 'username', payload: event.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">密码</label>
              <input
                type="password"
                value={state.password}
                className="form-control"
                onChange={(event) =>
                  dispatch({ type: 'password', payload: event.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">重复密码</label>
              <input
                type="password"
                value={state.password1}
                className="form-control"
                onChange={(event) =>
                  dispatch({ type: 'password1', payload: event.target.value })
                }
              />
            </div>
          </div>

          <div className="card-footer">
            <div className="d-grid gap-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSignUp}
              >
                注册
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer>footer</footer>
    </div>
  );
}
