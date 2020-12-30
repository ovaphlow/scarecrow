import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './Navbar';
import { reducer } from './miscellaneous';

const initial_state = {
  category: '',
  name: '',
  value: '',
  remark: '',
};

export default function SettingDetail({ option }) {
  const [category_list, setCategoryList] = React.useState([]);
  const [state, dispatch] = React.useReducer(reducer, initial_state);

  React.useEffect(() => {
    window
      .fetch('/api/setting/list?category=list-group')
      .then((response) => response.json())
      .then((data) => {
        setCategoryList(data);
      });
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <Navbar />
      </header>

      <section className="container-fluid page-title pt-2">
        <h2>SETTING</h2>
        <hr />
        <ul className="nav nav-tabs justify-content-end">
          <li className="nav-item">
            <a className="nav-link active" href="/setting">
              系统设置
            </a>
          </li>
        </ul>
      </section>

      <main className="d-flex flex-grow-1 flex-column container-xl">
        <div className="card shadow w-100 mt-3">
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">类别</label>
              <input
                type="text"
                list="category-list"
                value={state.category}
                className="form-control"
                onChange={(event) =>
                  dispatch({
                    type: 'set',
                    payload: { key: 'category', value: event.target.value },
                  })
                }
              />
              <datalist id="category-list">
                {category_list.map((iter, index) => (
                  <option value={iter.category} key={index} />
                ))}
              </datalist>
            </div>

            <div className="mb-3">
              <label className="form-label">名称</label>
              <input
                type="text"
                value={state.name}
                className="form-control"
                onChange={(event) =>
                  dispatch({
                    type: 'set',
                    payload: { key: 'name', value: event.target.value },
                  })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">内容</label>
              <input
                type="text"
                value={state.value}
                className="form-control"
                onChange={(event) =>
                  dispatch({
                    type: 'set',
                    payload: { key: 'value', value: event.target.value },
                  })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">备注</label>
              <input
                type="text"
                value={state.remark}
                className="form-control"
                onChange={(event) =>
                  dispatch({
                    type: 'set',
                    payload: { key: 'remark', value: event.target.value },
                  })
                }
              />
            </div>
          </div>

          <div className="card-footer d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => window.history.go(-1)}
            >
              返回
            </button>

            <button type="button" className="btn btn-primary">
              保存
            </button>
          </div>
        </div>
      </main>

      <footer>123fe</footer>
    </div>
  );
}

SettingDetail.propTypes = {
  option: PropTypes.string.isRequired,
};
