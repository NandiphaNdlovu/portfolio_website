import Project from '../components/Project';
import { Container, Row} from "react-bootstrap";

export const Projects = () => {
    return (
        <Container className='projects' id='projects'>
            <Row>
                <h1>
                    Projects
                </h1>
                <div>
                    <Project />
                </div>
            </Row>
        </Container>
    )
}