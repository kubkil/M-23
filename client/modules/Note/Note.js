import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';
import styles from './Note.css';

const Note = props =>
  <li className={styles.Note}>{props.children}</li>;

Note.propTypes = {
  children: PropTypes.any,
};

export default Note;
