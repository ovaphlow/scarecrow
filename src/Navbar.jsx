import React from 'react';

export default function Navbar() {
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {
    window
      .fetch('/api/info')
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
      });
  }, []);

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          {title}
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/">
              <strong>Home</strong>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/setting">
              <strong>设置</strong>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
