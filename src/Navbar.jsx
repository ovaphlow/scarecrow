import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUserCircle,
  faCogs,
} from '@fortawesome/free-solid-svg-icons';

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
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          {title}
        </a>
        <div className="navbar-nav">
          <a className="nav-link" href="#">
            <span className="text-info">
              <FontAwesomeIcon icon={faHome} fixedWidth />
            </span>
          </a>
          <a className="nav-link" href="#">
            <span className="text-danger">
              <FontAwesomeIcon icon={faCogs} fixedWidth />
            </span>
          </a>
          <a className="nav-link" href="#">
            <span className="text-light">
              <FontAwesomeIcon icon={faUserCircle} fixedWidth />
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}
