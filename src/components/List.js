import React from 'react';

const List = ({ todoItems }) => (
    <div className="container">
    {
      todoItems && todoItems.map((item, index) =>
      <ul>
          <li>
            <label>
                <input type="checkbox"/>
                <span key={index}>{item}</span>
            </label>
        </li>
      </ul>)
    }
</div> 
);

export default List;
