import React, {PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

const ActionsBtn = props =>  
  <div className="Actions">
  <ButtonToolbar >
    <Button 
      bsStyle="info"
      bsSize="small"
      tabIndex="0"
      className="ActionsInfo"
      title="More info"
      onClick={props.onAction.bind(null, 'info')}> &#8505; Info </Button>
    <Button 
      bsStyle="warning"
      bsSize="small"
      tabIndex="0" 
      className="ActionsEdit" 
      title="Edit"
      onClick={props.onAction.bind(null, 'edit')}>&#10000; Edit</Button>
    <Button 
      bsStyle="danger"
      bsSize="small"
      tabIndex="0"
      className="ActionsDelete"
      title="Delete"
      onClick={props.onAction.bind(null, 'delete')}>
      <i className="fa fa-trash-o " aria-hidden="true"> </i> &nbsp;
      Delete</Button>
  </ButtonToolbar>
  </div>

ActionsBtn.propTypes = {
  onAction: PropTypes.func,
};

ActionsBtn.defaultProps = {
  onAction: () => {},
};

export default ActionsBtn
