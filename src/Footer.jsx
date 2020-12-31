import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCode } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <footer className="mt-4 p-2 text-light d-flex justify-content-between">
      <strong>
        UI demo for{' '}
        <a
          href="https://github.com/ovaphlow/sentinel"
          target="_blank"
          rel="noreferrer"
          className="text-decoration-none text-light"
        >
          <FontAwesomeIcon icon={faGithub} fixedWidth />
          ovaphlow/sentinel
        </a>
      </strong>

      <strong>
        <FontAwesomeIcon icon={faCode} fixedWidth />
        &nbsp; by{' '}
        <a
          href="https://github.com/ovaphlow/scarecrow"
          target="_blank"
          rel="noreferrer"
          className="text-decoration-none text-light"
        >
          ovaphlow
        </a>
      </strong>
    </footer>
  );
}
