/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Details = () => {
  const [details, setDetails] = useState<DetailsType>();

  const params = useParams();

  interface DetailsType {
    id: number;
    title: string;
    authors: Author[];
    url: string;
    image_url: string;
    news_site: string;
    summary: string;
    published_at: string;
    updated_at: Date;
    featured: boolean;
    launches: unknown;
    events: unknown;
  }

  interface Author {
    name: string;
    socials: null;
  }

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
    <div>
      <p>
        {details && (
          <Container>
            <Row>
              <Col xs={12} md={8}>
                <Card>
                  <Card.Img variant="top" src={details.image_url} />
                  <Card.Body>
                    <Card.Title>{details.title}</Card.Title>
                    <Card.Text>{details.summary}</Card.Text>
                    <Card.Text>{details.summary}</Card.Text>
                    <div className="d-flex  justify-content-between">
                      <Card.Text>{details.authors[0].name}</Card.Text>
                      <Card.Text>{details.published_at.slice(0, 10)}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
      </p>
    </div>
  );
};

export default Details;
