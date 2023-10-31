const Login = ({ handleLogin, username, setUsername, password, setPassword }) => {
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    username <input 
                        type='text'
                        value={username}
                        name='username'
                        onChange={event => setUsername(event.target.value)}
                    />
                </div>
                <div>
                    password <input 
                        type='password'
                        value={password}
                        name='password'
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <div>
                    <button type='submit'>login</button>
                </div>
            </form>
        </div>
    )
}

export default Login