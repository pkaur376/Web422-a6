import { useAtom } from 'jotai';
import { favouritesAtom } from '../store.js';
import { Row ,Col, Card } from "react-bootstrap"
import ArtworkCard from "../components/ArtworkCard"
export default function Favourites() {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    if(!favouritesList) return null;
    if (favouritesList) {
        return(
        <Row className="gy-4">
            {favouritesList.length > 0 ? 
            favouritesList.map((favouritesList) => (
                <Col lg={3} key={favouritesList}><ArtworkCard objectID={favouritesList} /></Col>
            ))
            :
            <Card>
                <Card.Body><h4>Nothing Here</h4> 
                Try adding some new artwork to the list.
                </Card.Body>
            </Card>
            }
        </Row>
        )
    }
}