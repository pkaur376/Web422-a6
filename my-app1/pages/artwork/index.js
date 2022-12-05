/********************************************************************************* 
 * * WEB422 – Assignment 6
 * * I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
 * * No part of this assignment has been copied manually or electronically from any other source 
 * * (including web sites) or distributed to other students. *
 * 
 * * Name: Pawan Deep Student ID: 111144218 Date: 12/04/2022 *
 * 
 * * Vercel App (Deployed) Link: https://final-assignment-beige.vercel.app/
 * 
 * * ********************************************************************************/

import { useState, useEffect} from "react";
import { useRouter } from 'next/router';
import Error from "next/error";
import { Row ,Col, Card } from "react-bootstrap"
import ArtworkCard from "../../components/ArtworkCard"
import useSWR from 'swr';
import Pagination from 'react-bootstrap/Pagination';
import validObjectIDList from '../../public/data/validObjectIDList.json'
const PER_PAGE=12;

export default function Artwork() {
    const [ page, setPage ] = useState(1);
    const [artworkList, setArtworkList] = useState();
    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);
    
    function previousPage(){
        if (page>1){
            setPage((page)=>page-1);
        }
    }
    function nextPage(){
        if(page<artworkList.length){
            setPage((page)=>page+1)
        }
    }
    useEffect(() => {
        if (data) {
            let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
            var results=[]
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                const chunk = filteredResults.slice(i, i + PER_PAGE);
                results.push(chunk);
            }
            setArtworkList(results);
        }
    }, [data]);
    if (error) {
        return (
        <>
            <Error statusCode={404} />
        </>
        )
    }
    if (artworkList) {
        return(
        <>
        <Row className="gy-4">
            {artworkList.length > 0 ? 
            artworkList[page-1].map((artworkList) => (
                <Col lg={3} key={artworkList}><ArtworkCard objectID={artworkList} /></Col>
            ))
            :
            <Card>
                <Card.Body><h4>Nothing Here</h4> 
                Try searching for something else.
                </Card.Body>
            </Card>
            }
        </Row>
        {artworkList.length>0?
        <Row>
            <Col>
                <Pagination>
                <Pagination.Prev onClick={()=>previousPage()}/>
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={()=>nextPage()}/>
                </Pagination>
            </Col>
        </Row>:null}
        </>
        )
    }

}
