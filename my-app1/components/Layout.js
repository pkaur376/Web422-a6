import Container  from 'react-bootstrap/Container';
import MainNav from './MainNav';

export default function Layout(props) {
    return (
        <>
            <MainNav />
            <br />
            <br/>
            <Container>
                {props.children}
            </Container>
            <br />
        </>
    )
}