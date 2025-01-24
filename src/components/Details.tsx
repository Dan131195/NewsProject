/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Detail } from "../types/Detail";

const Details = () => {
  const [details, setDetails] = useState<Detail>();

  const params = useParams();

  const getDetails = async () => {
    try {
      const response = await fetch(
        "https://api.spaceflightnewsapi.net/v4/articles/" + params.id
      );
      if (response.ok) {
        const data = await response.json();
        setDetails(data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getDetails();
  }, [params.id]);

  return (
    <main>
      {details && (
        <Container className="myContainer">
          <Row className=" justify-content-center mt-3">
            <Col xs={12} md={8}>
              <Card>
                <Card.Img
                  variant="top"
                  src={details.image_url}
                  className="h-100 w-100"
                />
                <Card.Body>
                  <Card.Title>{details.title}</Card.Title>
                  <Card.Text>{details.summary}</Card.Text>
                  <Card.Text>{details.summary}</Card.Text>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <Card.Text>{details.authors[0].name}</Card.Text>
                    <Card.Text>{details.published_at.slice(0, 10)}</Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </main>
  );
};

export default Details;
