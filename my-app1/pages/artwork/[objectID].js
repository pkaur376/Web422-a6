import { Row ,Col } from "react-bootstrap"
import { useRouter } from 'next/router';
import ArtworkCardDetail from "../../components/ArtworkCardDetail"

export default function ArtworkById() {
  const router = useRouter();
  const { objectID } = router.query;
  return (
    <Row>
        <Col>
            <ArtworkCardDetail objectID={objectID} />
        </Col>
    </Row>
  )
}
