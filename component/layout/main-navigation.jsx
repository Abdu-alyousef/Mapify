import Link from 'next/link';

import classes from './main-navigation.module.css';
import { useAuth } from "../AuthContext";


function MainNavigation() {

  const {session, logout} = useAuth()


  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>MapiFy</div>
      </Link>
      <nav>
        <ul>
       {!session && (
          <li>
            <Link href="/auth">Login</Link>
          </li>
        )}
        {session && (
          <li>
            <button onClick={logout}>Logout</button>
          </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
