import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

/*import Glyphicon from 'react-bootstrap/lib/Glyphicon'; */
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import NavItem from 'react-bootstrap/lib/NavItem';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
 
/*    import styles from '../../../css/components/bootstrap.css';   */

class NavPan extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div   >

            <Navbar inverse collapseOnSelect >
            <Navbar.Header>
            <Navbar.Brand>
            <a href = "#" >
              <i className="fa fa-book fa-lg" aria-hidden="true">
              </i> &nbsp; &#x2606; БЛОКНОТ-BS3-v0082 
            </a>
            </Navbar.Brand> 
            <Navbar.Toggle/>
            </Navbar.Header> 
            <Navbar.Collapse>
            
            <Nav>
            
            <NavItem eventKey = { 1 } href = "#" > Новый файл. </NavItem> 
            <NavItem onClick = { this.props.onFileOpen } href = "#" > 
            <span className="fa fa-folder-open-o fa-lg " aria-hidden="true"></span>&nbsp; 
             Открыть файл. </NavItem> 
            <NavDropdown 
              eventKey = { 3 } 
              title = "Dropdown"
              id = "basic-nav-dropdown" >
            
            <MenuItem onClick = { this.props.onFileSave } href="data.json">
            <i className="fa fa-floppy-o" aria-hidden="true"> </i> &nbsp;
             Сохранить файл. </MenuItem> 
            <MenuItem eventKey = { 3.2 } > Another action </MenuItem> 
            <MenuItem eventKey = { 3.3 } > Something else here </MenuItem> 
                <MenuItem divider />
                
                <MenuItem eventKey = { 3.3 } > Separated link </MenuItem> 
                </NavDropdown> 
                </Nav> 
                <Nav pullRight >
                
                <NavItem onClick = { this.props.onFileSave } href="data.json" >
                <i className="fa fa-floppy-o fa-lg" aria-hidden="true"> </i> &nbsp;
                 Сохранить файл. </NavItem>
                <NavItem onClick = { this.props.onAbout } href = "#"> 
                <i className="fa fa-info-circle fa-lg" aria-hidden="true"> </i> &nbsp;
                  О программе. </NavItem> 
                </Nav> 
                </Navbar.Collapse> 
                </Navbar>
                </div>
        );
    }
}
NavPan.propTypes = {
  onFileOpen: PropTypes.func,
  onFileSave: PropTypes.func,
  onAbout: PropTypes.func,
};

export default NavPan
