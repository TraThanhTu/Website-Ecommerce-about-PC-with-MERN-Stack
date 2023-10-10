import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductSreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Badge from 'react-bootstrap/esm/Badge';
import Nav from 'react-bootstrap/esm/Nav';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen'; 
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';



function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.clear('shippingAddress');
    localStorage.clear('paymentMethod');
  };
  
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        {/* <div className="slider-header">
          <div className="slides-header">
            <input type="radio" name="radio-btn" id="radio1" />
            <input type="radio" name="radio-btn" id="radio2" />
            <input type="radio" name="radio-btn" id="radio3" />
            <div className="slide first">
              <img src="../images/slide-header1.jpg" alt=""></img>
            </div>
            <div className="slide">
              <img src="../images/slide-header2.jpg" alt=""></img>
            </div>
            <div className="slide">
              <img src="../images/slide-header3.jpg" alt=""></img>
            </div>
          </div>
        </div> */}
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar className="bg-color" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>HEAVENGAMMING</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto"></Nav>
              <Link to="/cart" className="nav-link">
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge className="cart" pill bg="warning">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>

                  <LinkContainer to="/profile">
                    <NavDropdown.Item>User profile</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order history</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Divider />
                  <Link className='dropdown-item' to="#signout" onClick={signoutHandler}>
                    Sign out
                  </Link>

                </NavDropdown>
              ):(
                <Link className="nav-link" to='/signin'>
                Sign In
                </Link>
              ) }


            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductSreen />} />
              

              {/* Van Ty*/}
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />

              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />

              
              {/*---------*/}
              <Route path="/" element={<HomeScreen />} />

            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reseved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
