import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Navbar from './Navbar';

export default function SettingList() {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    window
      .fetch('/api/setting/list')
      .then((response) => response.json())
      .then((data) => {
        console.info(data);
        setList(data);
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
              <input type="text" className="form-control" placeholder="" />
            </div>
          </div>

          <div className="col">
            <input type="text" className="form-control" placeholder="关键词" />
          </div>

          <div className="col-auto">
            <button type="button" className="btn btn-secondary">
              查询
            </button>
          </div>
        </form>

        <div className="card shadow w-100 mt-3 p-4">
          <table className="table table-hover caption-top">
            <caption>
              <a href="/setting/append" className="text-decoration-none">
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
              </tr>
            </thead>

            <tbody>
              {list.map((iter) => (
                <tr key={iter.id}>
                  <th scope="row">{iter.id}</th>
                  <td>{iter.category}</td>
                  <td>{iter.name}</td>
                  <td>{iter.value}</td>
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
