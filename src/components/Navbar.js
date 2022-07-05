import { Link, useHistory } from 'react-router-dom';
import './style/nav.css'



const Navbar = ({token, setToken, user, setUser}) => {
    const history = useHistory();
    const handleLogout = () => {
        setUser({})
        setToken('')
        localStorage.clear()
        history.push('/login')
      }
    return <>
    <div className='nav-container'>
    
        {/* <div id="link-title">Strangers Things {user.username && <div className="logged-in">Welcome {user.username.toUpperCase()}</div> }<div>The Resale Site for Everything</div></div> */}
    {
        <nav className="nav-bar">
        <Link to="users/me" className="links">{token ? 'User Profile' : ''}</Link> 
        <Link to="/messages" className="links">{token ? 'Messages' : ''}</Link>
        <Link to="/addposts" className="links">{token ? 'Create Post' : ''}</Link>
        {token ? <Link to="/login" onClick={handleLogout} className="links">Logout</Link> : 
        <Link to='/login' onClick ={() => { 
            if (token) {
                setToken('')
                setUser({})
            }
        }}className="links">{token ? 'Log out' : 'Login'}</Link>}
         <Link path to="/" className="links">Home</Link>
    </nav>
    }
    </div>
    </>
}

export default Navbar