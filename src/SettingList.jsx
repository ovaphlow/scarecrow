import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';

import Navbar from './Navbar';
import Footer from './Footer';
import { reducer } from './miscellaneous';

const initial_filter = {
  category: '',
  keyword: '',
  page: 0,
};

export default function SettingList() {
  const [filter, dispatch] = React.useReducer(reducer, initial_filter);
  const next_page = React.useRef(null);
  const [list, setList] = React.useState([]);
  const [category_list, setCategoryList] = React.useState([]);
  const [eof, setEof] = React.useState(false);
  const history = useHistory();

  const handleFilter = () => {
    next_page.current.style.display = 'none';
    setList([]);
    window
      .fetch(`/api/setting/list?category=filter`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          category: filter.category,
          keyword: filter.keyword,
        }),
      })
      .then((response) => {
        if (response.status === 200) return response.json();
        else window.alert('服务器错误');
      })
      .then((data) => {
        setList(data);
      });
  };

  const handleNextPage = () => {
    history.push(`?page=${filter.page + 1}`);
    dispatch({ type: 'set', payload: { key: 'page', value: filter.page + 1 } });
  };

  React.useEffect(() => {
    window
      .fetch('/api/setting/list?category=list-group', {
        method: 'PUT',
      })
      .then((response) => response.json())
      .then((data) => {
        setCategoryList(data);
      });
  }, []);

  React.useEffect(() => {
    history.replace(`?page=0`);
  }, []);

  React.useEffect(() => {
    if (eof) {
      dispatch({
        type: 'set',
        payload: { key: 'page', value: filter.page - 1 },
      });
      setEof(false);
      return;
    }
    next_page.current.style.display = 'none';
    window
      .fetch('/api/setting/list', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ page: filter.page }),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          window.alert('没有更多的数据了');
          history.replace(`?page=${filter.page - 1}`);
          setEof(true);
          next_page.current.style.display = 'none';
        } else {
          setList(list.concat(data));
          next_page.current.style.display = 'block';
        }
      });
  }, [filter.page]);

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
              基础数据
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/staff">
              系统用户
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

          <div className="col-auto btn-group">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleFilter}
            >
              查询
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => {
                window.location = '/setting/';
              }}
            >
              重置
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

          <button
            type="button"
            className="btn btn-outline-info"
            style={{ display: 'none' }}
            ref={next_page}
            onClick={handleNextPage}
          >
            next page
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
