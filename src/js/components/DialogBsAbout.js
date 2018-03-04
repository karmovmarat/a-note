/*import from react */ 
import React, {Component, PropTypes} from 'react';

/*import from react-bootstrap */
import Button from 'react-bootstrap/lib/Button';

import Popover from 'react-bootstrap/lib/Popover';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import Modal from 'react-bootstrap/lib/Modal';
import ModalHeader from 'react-bootstrap/lib/ModalHeader';
import ModalTitle from 'react-bootstrap/lib/ModalTitle';
import ModalBody from 'react-bootstrap/lib/ModalBody';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import ModalFooter from 'react-bootstrap/lib/ModalFooter';

class DialogBsAbout extends Component {
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
     onHide={this.props.onAction } 
     backdrop="static" >
          <Modal.Header className="DialogHeader" closeButton>
            <Modal.Title> {this.props.header} </Modal.Title>
          </Modal.Header>

          <Modal.Body>
             <hr/>
             {this.props.children}

          </Modal.Body>

          <Modal.Footer>
            <div className="ModalFooterCopyright"> Copyright © 2017–2018 Karmov Marat
            <p>Los Angeles, California. 2018</p>
            <p>build: 2018.03.04.0084</p>
            </div>
              {this.props.hasCancel
                ?  <Button 
                  bsStyle="defaultcustom"
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

DialogBsAbout.propTypes = {
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

DialogBsAbout.defaultProps = {
  confirmLabel: 'ok',
  modal: false,
  showModal: false,
  onAction: () => {},
  onClos: () => {},
  hasCancel: true,
  bsStyleConfirm: "default",
  classNameSize: "",
};

export default DialogBsAbout
