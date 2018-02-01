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
              <span className="glyphicon glyphicon-list-alt" aria-hidden="true">
              </span>  &#x2606; БЛОКНОТ-BS3-v0081 
            </a>
            </Navbar.Brand> 
            <Navbar.Toggle/>
            </Navbar.Header> 
            <Navbar.Collapse>
            
            <Nav>
            
            <NavItem eventKey = { 1 } href = "#" > Новый файл. </NavItem> 
            <NavItem onClick = { this.props.onFileOpen } href = "#" > Открыть файл. </NavItem> 
            <NavDropdown 
              eventKey = { 3 } 
              title = "Dropdown"
              id = "basic-nav-dropdown" >
            
            <MenuItem onClick = { this.props.onFileSave } href="data.json"> Сохранить файл. </MenuItem> 
            <MenuItem eventKey = { 3.2 } > Another action </MenuItem> 
            <MenuItem eventKey = { 3.3 } > Something else here </MenuItem> 
                <MenuItem divider />
                
                <MenuItem eventKey = { 3.3 } > Separated link </MenuItem> 
                </NavDropdown> 
                </Nav> 
                <Nav pullRight >
                
                <NavItem onClick = { this.props.onFileSave } href="data.json" > Сохранить файл. </NavItem>
                <NavItem onClick = { this.props.onAbout } href = "#" > О программе. </NavItem> 
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
