import useSWR from 'swr';
import {Button, Card} from 'react-bootstrap';
import Error from "next/error";
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store.js';
import { useState } from 'react';
import { addToFavourites, removeFromFavourites } from '../lib/userData.js';
import { useEffect } from 'react';

export default function ArtworkCardDetail(props){
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);
    
    useEffect(()=>{
        setShowAdded(favouritesList?.includes(props.objectID))
    }, [favouritesList])

    async function favouritesClicked(){
        if (showAdded==true) {
            setFavouritesList(await removeFromFavourites(props.objectID))
            setShowAdded(false)
        }
        else{
            setFavouritesList(await addToFavourites(props.objectID))
            setShowAdded(true)
        }
    }

    const { data, error } = useSWR(props.objectID?`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`:null);
    if(error){
        return(
            <Error statusCode={404} />
        )
    }
    else if(data){
        return (
            <Card>
            {data.primaryImage? <Card.Img variant="top"  src={data.primaryImage} />:""}
            <Card.Body>
                <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
                <Card.Text> <strong>Date: </strong>{data.objectDate ? data.objectDate:"N/A"} <br/>
                <strong>Classification: </strong>{data.classification? data.classification:"N/A"}<br/>
                <strong>Medium: </strong>{data.medium ? data.medium : "N/A"}<br/> <br/>
                <strong>Artist: </strong>{data.artistDisplayName ? data.artistDisplayName +" ( ":"N/A"}
                {data.artistDisplayName?  <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>: ""}
                {data.artistDisplayName?" )":""}
                <br/>
                <strong>Credit Line: </strong>{data.creditLine? data.creditLine:"N/A"}<br/>
                <strong>dimensions: </strong>{data.dimensions ? data.dimensions : "N/A"}<br/> <br/>
                <Button variant={showAdded?"primary":"outline-dark"} onClick={(e)=>favouritesClicked()}>{showAdded?"+ Favourite ( added )":"+ Favourite"}</Button>
                </Card.Text>
            </Card.Body>
        </Card>
        );
    }
    else{
        return null;
    }

}

