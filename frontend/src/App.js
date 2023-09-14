import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductSreen from './screens/ProductScreen';
function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="slider-header">
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
        </div>
        
        <header>
          <a href="/">UTH</a>
        </header>
        <main>
          <Routes>
            <Route path="/product/:slug" element={<ProductSreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
