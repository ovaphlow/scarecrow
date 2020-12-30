import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';

import Navbar from './Navbar';
import { reducer } from './miscellaneous';

const initial_filter = {
  category: '',
  keyword: '',
};

export default function SettingList() {
  const [list, setList] = React.useState([]);
  const [category_list, setCategoryList] = React.useState([]);
  const [filter, dispatch] = React.useReducer(reducer, initial_filter);

  const handleFilter = () => {
    setList([]);
    window
      .fetch(
        `/api/setting/list?category=filter&filter_category=${filter.category}&filter_keyword=${filter.keyword}`,
      )
      .then((response) => {
        if (response.status === 200) return response.json();
        else window.alert('服务器错误');
      })
      .then((data) => {
        setList(data);
      });
  };

  React.useEffect(() => {
    window
      .fetch('/api/setting/list')
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      });
  }, []);

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
        <form className="row gy-2 gx-3 align-items-center mt-4">
          <div className="col">
            <div className="input-group">
              <div className="input-group-text">类别</div>
              <input
                type="text"
                list="category-list"
                value={filter.category}
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
          </div>

          <div className="col">
            <input
              type="text"
              value={filter.keyword}
              className="form-control"
              placeholder="关键词"
              onChange={(event) =>
                dispatch({
                  type: 'set',
                  payload: { key: 'keyword', value: event.target.value },
                })
              }
            />
          </div>

          <div className="col-auto">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleFilter}
            >
              查询
            </button>
          </div>
        </form>

        <div className="card shadow w-100 mt-3 p-4">
          <table className="table table-hover caption-top">
            <caption>
              <a
                href="/setting/append"
                className="text-decoration-none link-success"
              >
                <FontAwesomeIcon icon={faPlus} fixedWidth />
                新增
              </a>
            </caption>

            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">类别</th>
                <th scope="col">名称</th>
                <th scope="col">内容</th>
                <th scope="col" className="d-flex justify-content-end">
                  操作
                </th>
              </tr>
            </thead>

            <tbody>
              {list.map((iter) => (
                <tr key={iter.id}>
                  <th scope="row">{iter.id}</th>
                  <td>{iter.category}</td>
                  <td>{iter.name}</td>
                  <td>{iter.value}</td>
                  <td className="d-flex justify-content-end">
                    <a
                      href={`/setting/${iter.id}`}
                      className="text-decoration-none link-info"
                    >
                      <FontAwesomeIcon icon={faEdit} fixedWidth />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer>123fe</footer>
    </div>
  );
}
