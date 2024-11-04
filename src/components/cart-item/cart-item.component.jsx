
import './cart-item.styles.scss';


const CartItem = ({ cartItem }) => {
  const {name, quantity, imageUrl} = cartItem
  return (
    <div className='cart-item-container'>
      <img src={imageUrl} alt={`${name}`}/>
      <h2>{name}</h2>
      <span>Quantity: {quantity}</span>
    </div>
  )
}

export default CartItem