import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/Wave.svg";
import { Download } from "react-bootstrap-icons";
import "animate.css";
import cvDownload from "../assets/data/NandiphaBianca_Ndlovu-CV.pdf";
import TrackVisibility from "react-on-screen";

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["Software Developer", "Web Developer"];
  const period = 100;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <span className="tagline">Hello:) I'm Nandipha Ndlovu</span>
          <h1>
            <span
              className="txt-rotate"
              dataperiod="1000"
              data-rotate='[ "Software Developer", "Web Developer"]'
            >
              <span className="wrap">{text}</span>
            </span>
          </h1>
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <p>
                    Hi! 👋 I'm a Full-Stack Software Developer with a Bachelor
                    of Computing (Honours) from Belgium Campus iTversity. I
                    enjoy building scalable, user-focused applications and have
                    professional experience developing React frontends, ASP.NET
                    Core microservices, SQL Server databases, and AI-assisted
                    solutions. During my time at Altron HealthTech, I worked on
                    business-critical applications, automated manual SQL-driven
                    processes, built reusable frontend components, and developed
                    backend services that improved internal workflows.
                  </p>
                  <p>
                    I enjoy solving complex problems, learning new technologies,
                    and building software that has a meaningful impact. I'm
                    particularly interested in full-stack development, cloud
                    technologies, and AI-powered applications, and I'm
                    continuously expanding my skills in modern frameworks and
                    best practices. Outside of programming, you'll usually find
                    me knitting, building Minecraft data packs, or relaxing with
                    games like Coral Island and Grounded, because every
                    developer needs a creative outlet. 🎮🧶
                  </p>
                  {/*
                  <button onClick={() => console.log('connect')}>Let's Connect <ArrowRightCircle size={25} /></button>
                  */}
                  <a
                    href={cvDownload}
                    download="Nandipha_Ndlovu_CV_QRCode"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      onClick={
                        () =>
                          console.log(
                            "download CV",
                          ) /* Create a toast to inform of download */
                      }
                    >
                      Download CV
                      <Download size={25} />
                    </button>
                  </a>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                >
                  <img src={headerImg} alt="Header Img" />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
