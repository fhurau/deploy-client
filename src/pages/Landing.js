import { Category } from '../components/Category';
import Hero from '../components/Hero';
import { Restaurant } from '../components/Restaurant';

function Landing(isLogin, setIsLogin) {
  return (
    <>
      <Hero />
      <Category />
      <Restaurant isLogin ={isLogin} setIdlogin={setIsLogin} />
    </>
  );
}

export default Landing;
