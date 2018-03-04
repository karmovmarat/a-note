/*import from react */ 
import React, {Component, PropTypes} from 'react';

/*import from react-bootstrap */
import Button from 'react-bootstrap/lib/Button';
//import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

/*
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import FormControl from 'react-bootstrap/lib/FormControl'; 
*/

import Popover from 'react-bootstrap/lib/Popover';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import Modal from 'react-bootstrap/lib/Modal';
import ModalHeader from 'react-bootstrap/lib/ModalHeader';
import ModalTitle from 'react-bootstrap/lib/ModalTitle';
import ModalBody from 'react-bootstrap/lib/ModalBody';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import ModalFooter from 'react-bootstrap/lib/ModalFooter';

class DialogBs extends Component {
/*  
componentWillUnmount() {
    document.body.classList.remove('DialogModalOpen');
  }
  
  componentDidMount() {
    if (this.props.modal) {
      document.body.classList.add('DialogModalOpen');
    }
  }   
*/
  render() {
        const popover = (
              <Popover id="modal-popover" title="popover">
                very popover. such engagement
              </Popover>
        );
       const tooltip = (
              <Tooltip id="modal-tooltip">
                wowSS.
              </Tooltip>
       );

    return (
     <Modal 
     className={this.props.classNameSize} 
     show={this.props.showModal} 
     onHide={this.props.onAction.bind(this, 'dismiss')} 
     backdrop="static" >
          <Modal.Header className="DialogHeader" closeButton>
                      <Modal.Title> {this.props.header} </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <h4>Text in a modal</h4>
            <p>Duis mollis porttitor.</p>

            <h4>Popover in a modal</h4>
              <p>there is a <OverlayTrigger overlay={popover}>
                   <a href="#">popover</a>
                        </OverlayTrigger> here</p>

              <h4>Tooltips in a modal</h4>
                   <p>there is a <OverlayTrigger overlay={tooltip}>
                         <a href="#">tooltip</a></OverlayTrigger> here</p>

            <hr/>
              <h4> {this.props.children} </h4>
           
          </Modal.Body>
          <Modal.Footer>

              {this.props.hasCancel
                ?  <Button 
                  className="DialogDismiss"
                  onClick={this.props.onAction.bind(this, 'dismiss')}>
                  Cancel-Bs
                  </Button>
               : null
             }

            <Button 
            bsStyle={this.props.bsStyleConfirm}
            onClick={this.props.onAction.bind(this, 
                this.props.hasCancel ? 'confirm' : 'dismiss')}>
              {this.props.confirmLabel}
            </Button>

          </Modal.Footer>
        </Modal> 
   );
 }

}

DialogBs.propTypes = {
  header: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
  modal: PropTypes.bool,
  showModal: PropTypes.bool,
  onAction: PropTypes.func,
  onClos: PropTypes.func,
  hasCancel: PropTypes.bool,
  bsStyleConfirm: PropTypes.string,
  classNameSize: PropTypes.string,
};

DialogBs.defaultProps = {
  confirmLabel: 'ok',
  modal: false,
  showModal: false,
  onAction: () => {},
  onClos: () => {},
  hasCancel: true,
  bsStyleConfirm: "default",
  classNameSize: "",
};

export default DialogBs
