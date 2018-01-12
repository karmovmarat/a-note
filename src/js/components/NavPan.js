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

            <Navbar inverse collapseOnSelect  >
            <
            Navbar.Header >
            <
            Navbar.Brand >
            <
            a href = "#" > БЛОКНОТ-BS3 < /a> <
            /Navbar.Brand> <
            Navbar.Toggle / >
            <
            /Navbar.Header> <
            Navbar.Collapse >
            <
            Nav >
            <
            NavItem eventKey = { 1 } href = "#" > Новый файл. < /NavItem> 
            < NavItem eventKey = { 2 } href = "#" > Открыть файл. < /NavItem> 
            < NavDropdown eventKey = { 3 } title = "Dropdown"
            id = "basic-nav-dropdown" >
            
            < MenuItem eventKey = { 3.1 } > Сохранить < /MenuItem> 
            < MenuItem eventKey = { 3.2 } > Another action < /MenuItem> 
            < MenuItem eventKey = { 3.3 } > Something
            else here < /MenuItem> 
                < MenuItem divider / >
                
                < MenuItem eventKey = { 3.3 } > Separated link < /MenuItem> 
                < /NavDropdown> 
                < /Nav> 
                < Nav pullRight >
                <
                NavItem eventKey = { 1 } href = "#" > Сохранить файл. < /NavItem> <
                NavItem eventKey = { 2 } href = "#" > О программе. < /NavItem> <
                /Nav> <
                /Navbar.Collapse> <
                /Navbar>
                </div>
        );
    }

}

export default NavPan
