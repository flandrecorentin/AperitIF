import React, { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import {Link, useLocation, useNavigate} from "react-router-dom";
import "./header.scss";
import SearchBar from "../SearchBar/SearchBar.jsx";
import cocktail from "../../assets/cocktails.png"

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  let location = useLocation();
  let isHome = (location.pathname == '/');

  return (
    <header className="header">
      <div className="header__content">
        <div id={"header_title"}>
          <img src={cocktail} id={"logo"}/>
          <Link to="/" className="header__content__logo">
            <p className="title">APERIT'IF</p>
            <p className="subtitle">Your reference for cocktails</p>
          </Link>
        </div>

        <nav
          className={`${"header__content__nav"} 
          ${menuOpen && size.width < 768 ? `${"isMenu"}` : ""} 
          }`}
        >
          <ul>
            <li>
              {!isHome ? (
                  <SearchBar/>
              ) : (<div/>)}
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <div className="header__content__toggle">
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
