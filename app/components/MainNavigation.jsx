import { NavLink } from '@remix-run/react';

export default function MainNavigation({ username }) {
  return (
    <nav id="main-navigation">
      <ul>
        <li className="nav-item">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/notes">My Notes</NavLink>
        </li>
        {username ? (
          <form method="post" action="/auth/logout">
            <button type="submit">Logout</button>
          </form>
        ) : (
          <NavLink to="/auth/login">Login</NavLink>
        )}
      </ul>
    </nav>
  );
}

// website.com/auth/login?redirectTo=/notes
// custom redirect fonksiyonu olustucaz ve bunu cagiricaz
// bu fonksiyon once redirectTo var mi check edecek. varsa oraya yonlendirecek
// yoksa ana sayfaya yonlendirecek.
// safeRedirect -> / yoksa ekliycek, birden fazla varsa gerisini silecek.
