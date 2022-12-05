import useSWR from 'swr';
import {Button,Card} from 'react-bootstrap';
import Error from "next/error";
import Link from "next/link";

export default function ArtworkCard(props){
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`);
    if(error){
        return(
            <Error statusCode={404} />
        )
    }
    else if(data) {
        return (
            <Card>
                {data.primaryImageSmall ? <Card.Img variant="top"  src={data.primaryImageSmall} />: <Card.Img variant="top"  src="https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d"/>}
                <Card.Body>
                    <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
                    <Card.Text> <strong>Date: </strong>{data.objectDate ? data.objectDate:"N/A"} <br/>
                    <strong>Classification: </strong>{data.classification? data.classification:"N/A"}<br/>
                    <strong>Medium: </strong>{data.medium ? data.medium : "N/A"}<br/> <br/>
                    <Link href={`/artwork/${data.objectID}`} passHref><Button variant="outline-dark"><strong>ID:</strong>{data.objectID}</Button></Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
    else{
        return null;
    }
}