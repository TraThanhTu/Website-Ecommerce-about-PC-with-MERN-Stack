import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductSreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Badge from 'react-bootstrap/esm/Badge';
import Nav from 'react-bootstrap/esm/Nav';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import Button from 'react-bootstrap/Button';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';



function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [names, setNames] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();

    const fetchNames = async () => {
      try {
        const { data } = await axios.get(`/api/products/names`);
        setNames(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchNames();

    const fetchBrands = async () => {
      try {
        const { data } = await axios.get(`/api/products/brands`);
        setBrands(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchBrands();


  }, []);

  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? "d-flex flex-column site-container active-cont"
            : "d-flex flex-column site-container"
        }
      >
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
        < ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar className="bg-color" variant="dark" expand="lg">
            <Container>
              <Button
                className='sidebar-btn'
                variant='light'
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className='fas fa-bars'></i>
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand>HEAVENGAMMING</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="me-auto w-100 justify-content-end">
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
                  ) : (
                    <Link className="nav-link" to='/signin'>
                      Sign In
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/productlist">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orderlist">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/userlist">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>




            </Container>
          </Navbar>
        </header>

        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-conten-between flex-wrap flex-column sidebarPadding'
              : 'side-navbar d-flex justify-conten-between flex-wrap flex-column'
          }
        >
          <Nav className='flex-column text-black w-100 p-2'>
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category} >
                <LinkContainer className="sidebarText"
                  to={{
                    pathname: '/search',
                    search: `?category=${category}`,
                  }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>

          <Nav className='flex-column text-black w-100 p-2'>
            <Nav.Item>
              <strong>Name</strong>
            </Nav.Item>
            {names.map((name) => (
              <Nav.Item key={name}>
                <LinkContainer className='sidebarText'
                  to={{
                    pathname: '/search',
                    search: `?name=${name}`,
                  }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{name}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}

          </Nav>

          <Nav className='flex-column text-black w-100 p-2'>
            <Nav.Item>
              <strong>Brand</strong>
            </Nav.Item>
            {brands.map((brand) => (
              <Nav.Item key={brand}>
                <LinkContainer className="sidebarText"
                  to={{
                    pathname: '/search',
                    search: `?brand=${brand}`,
                  }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{brand}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}

          </Nav>


        </div>

        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductSreen />} />


              {/* Van Ty*/}
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />

              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfileScreen />
                </ProtectedRoute>
              } />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />

              <Route path="/order/:id" element={
                <ProtectedRoute>
                  < OrderScreen />
                </ProtectedRoute>}
              ></Route>

              <Route path="/orderhistory" element={
                <ProtectedRoute>
                  < OrderHistoryScreen />
                </ProtectedRoute>
              }
              ></Route>

              <Route path="/shipping" element={<ShippingAddressScreen />} ></Route>
              <Route path="/payment" element={<PaymentMethodScreen />} > </Route>

              <Route path="/placeorder" element={<PlaceOrderScreen />} />


              {/*---------*/}
              <Route path="/admin/dashboard" element={
                <AdminRoute>
                  <DashboardScreen />
                </AdminRoute>
              }></Route>
              <Route path="/" element={<HomeScreen />} />

            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reseved</div>
        </footer>
      </div>
    </BrowserRouter >
  );
}

export default App;
