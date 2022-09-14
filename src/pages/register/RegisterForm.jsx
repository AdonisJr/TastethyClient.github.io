import React from 'react';
import './register.css';

export default function RegisterForm(props) {

    const {handleSubmit, handleInput, credentials,
    handleFocused, isFocused} = props;


  return (
    <form action="" onSubmit={handleSubmit}>
          <h1>Sign up</h1>

            <div className="formControl">
                <input 
                  type="text" 
                  name='first_name' 
                  placeholder='First Name' 
                  onChange={handleInput}
                  value={credentials.first_name}
                  onBlur={handleFocused}
                  focused={isFocused.first_name.toString()}
                  required
                  />
                  <span>
                    First name is required
                  </span>
            </div>

            <div className="formControl">
                <input 
                    type="text" 
                    name='middle_name' 
                    placeholder='Middle Name' 
                    onChange={handleInput}
                    value={credentials.middle_name}/>
            </div>

            <div className="formControl">
                <input 
                  type="text" 
                  name='last_name' 
                  placeholder='Last Name' 
                  onChange={handleInput}
                  value={credentials.last_name}
                  onBlur={handleFocused}
                  focused={isFocused.last_name.toString()}
                  required
                  />

                  <span>
                    First name is required
                  </span>
            </div>

            <div className="formControl">
                <input 
                  type="number" 
                  name='age' 
                  placeholder='Age' 
                  onChange={handleInput}
                  value={credentials.age}
                  pattern=""
                  onBlur={handleFocused}
                  focused={isFocused.age.toString()}
                  required
                  />

                  <span>
                    Age is required and numbers only allowed
                  </span>

            </div>
            <div className="formControl">
                
                <input 
                  type="email" 
                  name='email' 
                  placeholder='Email Address'
                  onChange={handleInput}
                  value={credentials.email}
                  onBlur={handleFocused}
                  focused={isFocused.email.toString()}
                  required
                  />

                  <span>
                    Should be a valid email address
                  </span>
            </div>
            <div className="formControl">
                <input 
                  type="password" 
                  name='password' 
                  placeholder='Password' 
                  onChange={handleInput}
                  value={credentials.password}
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
                  onBlur={handleFocused}
                  focused={isFocused.password.toString()}
                  required
                  />
                <span>
                    Password Should contain 1 letter, 1 number and atleast 6 characters
                </span>
            </div>
            <div className="formControl">
                <input 
                  type="password" 
                  name='confirm_password' 
                  placeholder='Confirm Password'
                  onChange={handleInput}
                  value={credentials.confirm_password}
                  pattern={credentials.password}
                  onBlur={handleFocused}
                  focused={isFocused.confirm_password.toString()}
                  required
                  />
                  <span>
                    Password don't match
                  </span>
            </div>
            <div className="formControl">
                <button>Sign up</button>
            </div>
            
        </form>
  )
}
