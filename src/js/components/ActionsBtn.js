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
      onClick={props.onAction.bind(null, 'info')}> 
      <i className="fa fa-info-circle fa-3x" aria-hidden="true"> </i>  
      <span class="sr-only">More info...</span>
    </Button>

    <Button 
      bsStyle="warning"
      bsSize="small"
      tabIndex="0" 
      className="ActionsEdit" 
      title="Edit"
      onClick={props.onAction.bind(null, 'edit')}>
      <i className="fa fa-pencil-square-o fa-3x" aria-hidden="true">  </i> 
      <span className="sr-only">Edit.</span>
       </Button>

    <Button 
      bsStyle="danger"
      bsSize="small"
      tabIndex="0"
      className="sActionsDelete"
      title="Delete"
      onClick={props.onAction.bind(null, 'delete')}>
      <i className="fa fa-trash-o fa-3x" aria-hidden="true"> </i> 
      <span className="sr-only">Delete.</span>
     </Button>
  </ButtonToolbar>
  </div>

ActionsBtn.propTypes = {
  onAction: PropTypes.func,
};

ActionsBtn.defaultProps = {
  onAction: () => {},
};

export default ActionsBtn
