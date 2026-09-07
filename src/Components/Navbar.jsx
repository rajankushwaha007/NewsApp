import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

export default function Navbar() {

  let [q, setQ] = useState("All")
  let [language, setLanguage] = useState("hi")
  let [search, setSearch] = useState("")
  let [menuOpen, setMenuOpen] = useState(false)

  let [searchParams] = useSearchParams()
  let navigate = useNavigate()


  function closeMenu() {
    setMenuOpen(false)
  }


  function postSearch(e) {
    e.preventDefault()

    if (search.trim() === "") {
      return
    }

    navigate(`/?q=${encodeURIComponent(search.trim())}&language=${language}`)

    setSearch("")

    // Mobile menu close
    closeMenu()
  }


  useEffect(() => {

    setQ(searchParams.get("q") ?? "All")
    setLanguage(searchParams.get("language") ?? "hi")

  }, [searchParams])


  return (
    <>

      <nav className="navbar navbar-expand-lg bg-danger sticky-top">

        <div className="container-fluid">

          {/* Logo */}
          <Link
            className="navbar-brand text-light"
            to={`/?q=All&language=${language}`}
            onClick={closeMenu}
          >
            NewsAPP
          </Link>


          {/* Hamburger */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-controls="navbarSupportedContent"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>


          {/* Menu */}
          <div
            className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
            id="navbarSupportedContent"
          >

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">


              {/* All */}
              <li className="nav-item">

                <Link
                  className="nav-link text-light active"
                  to={`/?q=All&language=${language}`}
                  onClick={closeMenu}
                >
                  All
                </Link>

              </li>


              {/* Politics */}
              <li className="nav-item">

                <Link
                  className="nav-link text-light"
                  to={`/?q=Politics&language=${language}`}
                  onClick={closeMenu}
                >
                  Politics
                </Link>

              </li>


              {/* Crime */}
              <li className="nav-item">

                <Link
                  className="nav-link text-light"
                  to={`/?q=Crime&language=${language}`}
                  onClick={closeMenu}
                >
                  Crime
                </Link>

              </li>


              {/* Education */}
              <li className="nav-item">

                <Link
                  className="nav-link text-light"
                  to={`/?q=Education&language=${language}`}
                  onClick={closeMenu}
                >
                  Education
                </Link>

              </li>


              {/* Science */}
              <li className="nav-item">

                <Link
                  className="nav-link text-light"
                  to={`/?q=Science&language=${language}`}
                  onClick={closeMenu}
                >
                  Science
                </Link>

              </li>


              {/* Technology */}
              <li className="nav-item">

                <Link
                  className="nav-link text-light"
                  to={`/?q=Technology&language=${language}`}
                  onClick={closeMenu}
                >
                  Technology
                </Link>

              </li>


              {/* Sports */}
              <li className="nav-item">

                <Link
                  className="nav-link text-light"
                  to={`/?q=Sports&language=${language}`}
                  onClick={closeMenu}
                >
                  Sports
                </Link>

              </li>


              {/* Cricket */}
              <li className="nav-item">

                <Link
                  className="nav-link text-light"
                  to={`/?q=Cricket&language=${language}`}
                  onClick={closeMenu}
                >
                  Cricket
                </Link>

              </li>


              {/* IPL */}
              <li className="nav-item">

                <Link
                  className="nav-link text-light"
                  to={`/?q=IPL&language=${language}`}
                  onClick={closeMenu}
                >
                  IPL
                </Link>

              </li>


              {/* Other */}
              <li className="nav-item dropdown">

                <a
                  className="nav-link text-light dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Other
                </a>


                <ul className="dropdown-menu">

                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/?q=Entertainment&language=${language}`}
                      onClick={closeMenu}
                    >
                      Entertainment
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/?q=Fashion&language=${language}`}
                      onClick={closeMenu}
                    >
                      Fashion
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/?q=Business&language=${language}`}
                      onClick={closeMenu}
                    >
                      Business
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/?q=Economics&language=${language}`}
                      onClick={closeMenu}
                    >
                      Economics
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/?q=World&language=${language}`}
                      onClick={closeMenu}
                    >
                      World
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/?q=India&language=${language}`}
                      onClick={closeMenu}
                    >
                      India
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/?q=Jokes&language=${language}`}
                      onClick={closeMenu}
                    >
                      Jokes
                    </Link>
                  </li>

                </ul>

              </li>


              {/* Languages */}
              <li className="nav-item dropdown">

                <a
                  className="nav-link text-light dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Languages
                </a>


                <ul className="dropdown-menu">

                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/?q=${q}&language=hi`}
                      onClick={closeMenu}
                    >
                      Hindi
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/?q=${q}&language=en`}
                      onClick={closeMenu}
                    >
                      English
                    </Link>
                  </li>

                </ul>

              </li>

            </ul>


            {/* Search */}
            <form
              className="d-flex"
              role="search"
              onSubmit={postSearch}
            >

              <input
                className="form-control me-2"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="search"
                placeholder="Search"
                aria-label="Search"
              />

              <button
                className="btn btn-outline-light"
                type="submit"
              >
                Search
              </button>

            </form>

          </div>

        </div>

      </nav>

    </>
  )
}