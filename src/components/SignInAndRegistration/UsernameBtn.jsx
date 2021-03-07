import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Nav, DropdownButton, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { BACKEND_URL, GroupBuyContext, setLoggedInUsername } from '../../store.jsx';

export default function UsernameBtn() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const handleSignOut = () => {
    axios.put(`${BACKEND_URL}/signOut`, {}, { withCredentials: true })
      .then(() => {
        dispatch(setLoggedInUsername(null));
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <Nav.Link>
      <DropdownButton id="dropdown-basic-button" key="left" drop="left" title={store.loggedInUsername}>

        <Dropdown.Item>
          <Link to="/MyListings" style={{ textDecoration: 'none' }}>
            MyListings
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link to="/MyPurchases" style={{ textDecoration: 'none' }}>
            MyPurchases
          </Link>
        </Dropdown.Item>
        <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
      </DropdownButton>
    </Nav.Link>
  );
}
