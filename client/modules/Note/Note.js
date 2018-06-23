import React, { PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { compose } from 'redux';
import ItemTypes from '../Kanban/itemTypes';
import styles from './Note.css';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    const { connectDragSource, isDragging,
      editing, children } = this.props;

    const dragSource = editing ? a => a : connectDragSource;

    return dragSource(
      <li
        className={styles.Note}
        style={{
          opacity: isDragging ? 0 : 1
        }}
      >{children}</li>
    );
  }
}

Note.propTypes = {
  children: PropTypes.any,
  connectDragSource: PropTypes.any,
  isDragging: PropTypes.any,
  editing: PropTypes.any,
};

const noteSource = {
  beginDrag(props) {
    return {
      id: props.id,
      laneId: props.laneId,
    };
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  }
};

export default DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Note);
