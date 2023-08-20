import { Container, Row, Col } from "react-bootstrap";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col size={12} sm={6}>
            <p>© 2023 Nandipha Ndlovu. All Rights Reserved. Remember, just like potatoes, creativity here is meant to be enjoyed, not mashed without permission!</p>
          </Col>
          <Col size={5} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/nandipha-bianca-ndlovu-954310265?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BbeD%2BlXS1QZ%2B5q2LzzOKQzw%3D%3D"><img src={navIcon1} alt="Icon" /></a>
              <a href="https://github.com/NandiphaNdlovu"><img src={navIcon2} alt="Icon" /></a>
              <a href="https://www.fiverr.com/s/j03kl7"><img src={navIcon3} alt="Icon" /></a>
            </div>

          </Col>
        </Row>
      </Container>
    </footer>
  )
}
