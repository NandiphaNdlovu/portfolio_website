import { Container, Row, Col } from "react-bootstrap"

/*images import*/
import skillIcon1 from '../assets/img/prgLanguages/DeviconCsharp.svg'
import skillIcon2 from '../assets/img/prgLanguages//DeviconCss3.svg'
import skillIcon3 from '../assets/img/prgLanguages/DeviconHtml5.svg'
import skillIcon4 from '../assets/img/prgLanguages/LogosJavascript.svg'
import skillIcon5 from '../assets/img/prgLanguages/LogosJupyter.svg'
import skillIcon6 from '../assets/img/prgLanguages/LogosNodejs.svg'
import skillIcon7 from '../assets/img/prgLanguages/LogosPython.svg'
import skillIcon8 from '../assets/img/prgLanguages/LogosPytorchIcon.svg'
import skillIcon9 from '../assets/img/prgLanguages/LogosReact.svg'
import skillIcon10 from '../assets/img/prgLanguages/SimpleIconsMicrosoftsqlserver.svg'
import skillIcon11 from '../assets/img/prgLanguages/VscodeIconsFileTypeDelphi.svg'
import tskillIcon1 from '../assets/img/prgLanguages/LogosVisualStudio.svg'
import tskillIcon2 from '../assets/img/prgLanguages/LogosVisualStudioCode.svg'
import tskillIcon3 from '../assets/img/prgLanguages/DeviconWindows8.svg'
import tskillIcon4 from '../assets/img/prgLanguages/LogosVisualStudio.svg'
import tskillIcon5 from '../assets/img/prgLanguages/MdiMinecraft.svg'
import tskillIcon6 from '../assets/img/prgLanguages/TwemojiCoral.svg'
import tskillIcon7 from '../assets/img/prgLanguages/TablerBrandValorant.svg'

export const Skills = () => {
    return (
        <Container className="skills" id="skills">
            <h1>Skills</h1>
            <Row>
                <Col>
                    <h2>Soft Skills</h2>
                    <Row>
                        <p>
                            Problem-Solving 
                        </p>
                        <p>
                            Communication 
                        </p>
                        <p>
                            Team Collaboration 
                        </p>
                        <p>
                            Manage Tasks Optimally
                        </p>
                        <p>
                            Adaptable
                        </p>

                    </Row>
                </Col>

                <Col>
                    <h2>Technical Skills</h2>
                    <Row>
                        
                        <div className="skills-icon">
                        <div className="img-container">
                                <img src={skillIcon1} alt=""></img>
                                <span className="img-label">C#</span>
                            </div>
                            <div className="img-container">
                                <img src={skillIcon2} alt="" />
                                <span className="img-label">CSS3</span>
                            </div>
                            <div className="img-container">
                                <img src={skillIcon3} alt="" />
                                <span className="img-label">HTML5</span>
                            </div>
                            <div className="img-container">
                                <img src={skillIcon4} alt="" />
                                <span className="img-label">JavaScript</span>
                            </div>
                            <div className="img-container">
                                <img src={skillIcon5} alt="" />
                                <span className="img-label">Jupyter</span>
                            </div>
                            <div className="img-container">
                                <img src={skillIcon6} alt="" />
                                <span className="img-label">nodejs</span>
                            </div>
                            <div className="img-container">
                                <img src={skillIcon7} alt="" />
                                <span className="img-label">Python</span>
                            </div>
                            <div className="img-container">
                                <img src={skillIcon8} alt="" />
                                <span className="img-label">Pytorch</span>
                            </div>
                            <div className="img-container">
                                <img src={skillIcon9} alt="" />
                                <span className="img-label">React</span>
                            </div>
                            <div className="img-container">
                                <img src={skillIcon10} alt="" />
                                <span className="img-label">MS SQL Server</span>
                            </div>
                            <div className="img-container">
                                <img src={skillIcon11} alt="" />
                                <span className="img-label">Delphi</span>
                            </div>
                            <div className="img-container">
                                <img src={tskillIcon1} alt=""></img>
                                <span className="img-label">Visual Studio</span>
                            </div>
                            <div className="img-container">
                                <img src={tskillIcon2} alt="" />
                                <span className="img-label">Visual Studio Code</span>
                            </div>
                            <div className="img-container">
                                <img src={tskillIcon3} alt="" />
                                <span className="img-label">Microsoft 365</span>
                            </div>
                            <div className="img-container">
                                <img src={tskillIcon5} alt="" />
                                <span className="img-label">Minecraft</span>
                            </div>
                            <div className="img-container">
                                <img src={tskillIcon6} alt="" />
                                <span className="img-label">Coral Island</span>
                            </div>
                            <div className="img-container">
                                <img src={tskillIcon7} alt="" />
                                <span className="img-label">Valorant</span>
                            </div>
                        </div>
                    </Row>
                </Col>
                {/*
                <Col>
                    <h2>Specialised Skills</h2>
                </Col>
                */} 

            </Row>


        </Container>

    )
}
