import { Outlet, Link } from "react-router-dom"
import './navigation.styles.scss'
import{ ReactComponent  as CrownLogo} from '../../assets/crown.svg'
const Navigation = () => {
  return (
    <>
      <div className="navigation">
        <div className="logo-container" >
          <Link to="/"><CrownLogo width={50} height={50}/></Link>
          
        </div>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">SHOP</Link>
          <Link className="nav-link" to="/contact">CONTACT</Link>
          <Link className="nav-link">SIGN IN</Link>
          <Link className="nav-link">CHECKOUT</Link>
        </div>
        

      </div>
      <Outlet/>
    </>
  )
  
}

export default Navigation