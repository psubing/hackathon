import React from 'react';

export default props => (
  <li className='list-group-item'>
    <h4><u>{props.fullName}</u></h4>
    <p className="font-weight-bold">{props.description}</p>
    <p className="font-italic">{props.weatherInfo}</p>
    <p>{props.latLong}</p>
    <a className="btn btn-primary" href={props.url} role="button">Website</a>
  </li>
);