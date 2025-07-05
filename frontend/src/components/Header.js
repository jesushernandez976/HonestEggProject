import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar className='header' variant='dark' expand='lg'>
        <LinkContainer to='/'>
          <Navbar.Brand>
            <img src='../src/images/logo1.png' className='logo' alt='logo'></img>
          </Navbar.Brand>
          {/* <i class="fa-solid fa-shop"></i> */}
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto  w-100  justify-content-end'>
            <LinkContainer to='/about'>
              <Nav.Link>
                <i className='fas fa-info'></i> About Me
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
