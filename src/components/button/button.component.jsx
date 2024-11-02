import './button.styles.scss'

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted'
}

const Button = ({ children, buttonType, ...buttonProps }) => {
  
  return <button className={`${BUTTON_TYPE_CLASSES[buttonType]}`} {...buttonProps}>{children}</button>
    
  
}

export default Button