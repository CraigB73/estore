import { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component.jsx'
import './sign-up-form.style.scss'
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)

  const { displayName, email, password, confirmPassword } = formFields
  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }
  const handleChange = (event) => {
    /* The {name} is a reference to the formFiled 
     object state inorder to update the state. The {name, value} is provided  */
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if (password !== confirmPassword) {
      alert('Password does not match!')
      return;
    }
    try {
      const{ user }= await createAuthUserWithEmailAndPassword(email, password, displayName);
     
      await createUserDocumentFromAuth(user, { displayName })

      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use')
      } else {
        console.log('User creation encounter an error', error.message)
      }
    }
  };

  return (
    <div className='sign-up-form-container'>
      <h2>Don't have an account?</h2>
      <span>Sign Up With Email and Password</span>
      <div>
        <form onSubmit={handleSubmit}>
          <FormInput
            label='Display Name'
            type='text'
            name = 'displayName'
            value={displayName}
            onChange={handleChange}
            required
          /> 
          <FormInput
            label='Email'
            type='email'
            name='email'  
            value={email}
            onChange={handleChange }
            required
          />
          <FormInput
            label='Password'
            type='password'
            name ='password'  
            value={password}
            onChange={handleChange }
            required
          />
          <FormInput
            label='Confirm Password'
            type ='password'
            name ='confirmPassword'    
            value={confirmPassword}
            onChange={handleChange}
            required
          />
        <Button type='Submit'>Sign up</Button>
        </form>
      </div>
      
    </div>
  )
}

export default SignUpForm