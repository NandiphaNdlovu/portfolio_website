import { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';


import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';

export const NavBar = () => {
    const [activeLink, setActiveLink] = useState('home')//initially set to home 
    const [scrolled, setScrolled] = useState(false)//detect weather user is scrolling to change background accordingly 
    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])
    const onUpdateActiveLink = (value) => {
        setActiveLink(value)
    }
    return (
        //paste bootstrap nav bar
        <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
            <Container>
                <Navbar.Brand href="#home" className='logo'>
                    <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Portfolio</Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
                        <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Skills</Nav.Link>
                        <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Projects</Nav.Link>
                        <Nav.Link href="#contact" className={activeLink === 'contact' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('contact')}>Contact</Nav.Link>
                    </Nav>
                    <span className="navbar-text">
                        <div className="social-icon">
                            <a href="https://www.linkedin.com/in/nandipha-bianca-ndlovu-954310265?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BbeD%2BlXS1QZ%2B5q2LzzOKQzw%3D%3D"><img src={navIcon1} alt="" /></a>
                            <a href="https://github.com/NandiphaNdlovu"><img src={navIcon2} alt="" /></a>
                            <a href="https://www.fiverr.com/s/j03kl7"><img src={navIcon3} alt="" /></a>
                        </div>
                        <button className="vvd" onClick={() => console.log('connect')}>
                            <span>Let's Connect</span>
                        </button>
                        <div className='themeSwitch'>
                            {/*<DarkMode/>*/}
                        </div>
                    </span>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}