import React, { Component } from 'react';
import './ItemList.css';

export default class ItemList extends Component {
  render() {
    return (
      <div className="item-list">
        <ul className="list-group">
          <li className="list-group-item">
            Luke Skywalker
          </li>
          <li className="list-group-item">
            Darth Vader
          </li>
          <li className="list-group-item">
            R2-D2
          </li>
        </ul>
      </div>
    );
  }
}
