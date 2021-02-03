import React from 'react';

type ListGroupProps = {
  items: object[];
  textProperty?: string;
  onItemSelect: Function;
  selectedItem: any;
};

const ListGroup: React.FC<ListGroupProps> = (props) => {
  const { items, textProperty = 'name', selectedItem, onItemSelect } = props;
  return (
    <ul className="list-group">
      {items.map((item: any) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[textProperty || 'name']}
          className={
            selectedItem[textProperty] === item[textProperty]
              ? 'list-group-item active'
              : 'list-group-item'
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
