// eslint-disable-next-line no-use-before-define
import React, { Component } from 'react';

import styles from './comments.module.scss';

export default class Comments extends Component {
  componentDidMount(): void {
    const script = document.createElement('script');
    const anchor = document.getElementById('inject-comments-for-uterances');
    script.setAttribute('src', 'https://utteranc.es/client.js');
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('async', 'true');
    script.setAttribute(
      'repo',
      'AndersonUfop/challenge05-reactjs-creating-a-project-from-zero'
    );
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', 'github-dark');
    anchor.appendChild(script);
  }

  render(): JSX.Element {
    return (
      <div className={styles.comments} id="inject-comments-for-uterances" />
    );
  }
}
