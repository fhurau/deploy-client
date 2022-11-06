import Navbar2 from '../components/Navbar2';
import { Category } from '../components/Category';
import Hero from '../components/Hero';
import { Restaurant } from '../components/Restaurant';

function AfterLogin() {
  return (
    <div className="App">
      <Navbar2 />
      <Hero />
      <Category />
      <Restaurant />
    </div>
  );
}

export default AfterLogin;
