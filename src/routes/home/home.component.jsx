import CategoryDirectory from '../../components/category-directory/category-directroy.component';
import { Outlet } from 'react-router-dom';
import CATEGORIES_DATA from '../../categories.json';

const Home = () => {

  return (
    <div>
      <CategoryDirectory categories={CATEGORIES_DATA} key={CATEGORIES_DATA.id} />
      <Outlet />
    </div>
  ); 
}

export default Home;