import React, {PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

const ChooseBtn = props =>  
  <div className="DivChooseBtn">
  <ButtonToolbar >
    <Button
      block="true"
      bsStyle="primary"
      bsSize="small"
      tabIndex="0"
      className="ChooseBtn"
      title="Create New Note"
      onClick={props.onOpenModalChoose}> 
      <i className="fa fa-pencil-square-o fa-3x" aria-hidden="true">  </i> &nbsp;
      Create New Note. 
      <span className="sr-only">Create new note.</span>
    </Button>

    <Button 
      block="true"
      bsStyle="primary"
      bsSize="small"
      tabIndex="0" 
      className="ChooseBtn" 
      title="Open Saved Note"
      onClick={props.onOpenSavedNote}>
      <i className="fa fa-folder-open-o fa-3x " aria-hidden="true"> </i>&nbsp;
      Open Saved Note.
      <span className="sr-only">Open saved note.</span>
       </Button>
  </ButtonToolbar>
  </div>

ChooseBtn.propTypes = {
  onOpenModalChoose: PropTypes.func,
  onOpenSavedNote: PropTypes.func,
};

ChooseBtn.defaultProps = {
  onOpenModalChoose: () => {},
  onOpenSavedNote: () => {},
};

export default ChooseBtn
