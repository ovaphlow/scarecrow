import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import Navbar from './Navbar';
import Footer from './Footer';
import { reducer } from './miscellaneous';

const initial_state = {
  origin_id: 0,
  parent_id: 0,
  category: '',
  name: '',
  value: '',
  remark: '',
};

export default function SettingDetail({ option }) {
  const { id } = useParams();
  const [category_list, setCategoryList] = React.useState([]);
  const [state, dispatch] = React.useReducer(reducer, initial_state);

  const handleSave = () => {
    window
      .fetch('/api/setting', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(state),
      })
      .then((response) => {
        if (response.status === 200) window.history.go(-1);
        else window.alert('服务器错误');
      });
  };

  const handleUpdate = () => {
    window
      .fetch(`/api/setting/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(state),
      })
      .then((response) => {
        if (response.status === 200) window.history.go(-1);
        else window.alert('服务器错误');
      });
  };

  const handleRemove = () => {
    if (!window.confirm('确定要删除当前数据？')) return;
    window
      .fetch(`/api/setting/${id}`, {
        method: 'DELETE',
      })
      .then((response) => {
        if (response.status === 200) window.history.go(-1);
        else window.alert('服务器错误');
      });
  };

  React.useEffect(() => {
    window
      .fetch('/api/setting/list?category=list-group')
      .then((response) => response.json())
      .then((data) => {
        setCategoryList(data);
      });
  }, []);

  React.useEffect(() => {
    if (option === '编辑') {
      window
        .fetch(`/api/setting/${id}`)
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: 'set',
            payload: { key: 'category', value: data.category },
          });
          dispatch({
            type: 'set',
            payload: { key: 'name', value: data.name },
          });
          dispatch({
            type: 'set',
            payload: { key: 'value', value: data.value },
          });
          dispatch({
            type: 'set',
            payload: { key: 'remark', value: data.remark },
          });
        });
    }
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

            <div className="btn-group">
              {option === '编辑' && (
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={handleRemove}
                >
                  删除
                </button>
              )}

              <button
                type="button"
                className="btn btn-primary"
                onClick={option === '编辑' ? handleUpdate : handleSave}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

SettingDetail.propTypes = {
  option: PropTypes.string.isRequired,
};
