import { useContext} from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.componet";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils"

import { ReactComponent as ELogo } from '../../assets/estore.svg';

import './navigation.styles.scss';


const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  const { isCartOpen } = useContext(CartContext)
  
  
 
  return (
    <>
      <div className="navigation">
        <div className="logo-container" >
          <Link to="/"><ELogo width={75} height={75}/></Link>
        </div>
        <div className="nav-links-container">
         
          <Link className="nav-link" to="/shop">SHOP</Link>
          {/* <Link className="nav-link" to="/contact">CONTACT</Link> */}
          {
            currentUser ?
              (<>
                <span className="nav-link" onClick={signOutUser} >SIGN OUT</span>
                
              </>
              ) 
            : (<Link className="nav-link" to="/auth">SIGN IN</Link>)
          }
          <CartIcon/>
        </div>
        { isCartOpen && <CartDropdown />}
      </div>
      <Outlet/>
    </>
  )
  
}

export default Navigation