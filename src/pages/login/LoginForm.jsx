import React from 'react';

export default function LoginForm(props) {
    const {credentials, handleInput, handleSubmit} = props;
  return (
    <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <div className="formControl">
            <input 
                type="email"
                placeholder='Email' 
                name='email' 
                value={credentials.email}
                onChange={handleInput}
            />
        </div>
        <div className="formControl">
            <input 
                type="password" 
                placeholder='Password' 
                name='password' 
                value={credentials.password}
                onChange={handleInput}
            />
        </div>
        <div className="formControl">
            <button>Sign in</button>
        </div>
    </form>
  )
}
