import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductSreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Badge from 'react-bootstrap/esm/Badge';
import Nav from 'react-bootstrap/esm/Nav';
import { useContext } from 'react';
import { Store } from './Store';

function App() {
  const { state } = useContext(Store);
  const { cart } = state;
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

        <header>
          <Navbar className="bg-color" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Heaven Gaming</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto"></Nav>
              <Link to="/cart" className="nav-link">
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge className="cart" pill bg="warning">
                    {cart.cartItems.length}
                  </Badge>
                )}
              </Link>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductSreen />} />
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
