import md5 from 'blueimp-md5';
import React from 'react';

import { reducer } from './miscellaneous';

const initial_state = {
  username: '',
  password: '',
};

export default function SignIn() {
  const [state, dispatch] = React.useReducer(reducer, initial_state);
  const [title, setTitle] = React.useState('');

  const handleSignIn = () => {
    if (!state.username || !state.password) {
      window.alert('请完整填写所需信息');
      return;
    }
    window
      .fetch('/api/sign-in', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          username: state.username,
          password: md5(state.password),
        }),
      })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          if ([404, 403].indexOf(response.status) >= 0) {
            window.alert('用户不存在 或 用户名/密码 输入错误');
          } else {
            window.alert('服务器错误');
          }
          window.location.reload(true);
        }
      })
      .then((data) => {
        window.localStorage.setItem('auth', JSON.stringify(data));
        // window.location = '/';
      });
  };

  React.useEffect(() => {
    window
      .fetch('/api/info')
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
      });
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="container-xl">
        <h1>{title}</h1>
        <hr />
      </header>

      <main className="d-flex flex-grow-1 align-items-center justify-content-center container-xl">
        <div className="card col-4 col-xl-3 shadow">
          <div className="card-header">
            <h4>用户</h4>
          </div>

          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">用户名</label>
              <input
                type="text"
                value={state.username}
                className="form-control"
                onChange={(event) =>
                  dispatch({
                    type: 'set',
                    payload: { key: 'username', value: event.target.value },
                  })
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
                  dispatch({
                    type: 'set',
                    payload: { key: 'password', value: event.target.value },
                  })
                }
              />
            </div>
          </div>

          <div className="card-footer">
            <div className="d-grid gap-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSignIn}
              >
                登录
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer>footer</footer>
    </div>
  );
}
