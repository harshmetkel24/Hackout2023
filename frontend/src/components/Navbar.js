import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserContext } from '../UserContext';
import { useNavigate, Link } from "react-router-dom";

export default function MyNavbar() {

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    setUser({});
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link to="/" style={{textDecoration:'none'}}>
          <Navbar.Brand>PMS</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Link to ={'/allocation'} style={{textDecoration:"none"}}>
            <Nav.Link href="/allocation"  >Allocation</Nav.Link>
          </Link>
            {
              user.userName && (
                <Nav.Link onClick={() => handleLogOut()}>LogOut</Nav.Link>
              )
            }
            {
              !user.userName && (
               <Link to="/login" style={{textDecoration:'none'}}> <Nav.Link href={'/login'}>Login</Nav.Link></Link>
              )
            }
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}