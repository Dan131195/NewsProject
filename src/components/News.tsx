import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { News } from "../types/News";

const News = () => {
  const [newsData, setNewsData] = useState<News[]>([]);

  const navigate = useNavigate();

  interface News {
    id: number;
    title: string;
    authors: {
      name: string;
      socials: unknown;
    };
    url: string;
    image_url: string;
    news_site: string;
    summary: string;
    published_at: string;
    updated_at: Date;
    featured: boolean;
    launches: Launch[];
    events: unknown;
  }

  interface Launch {
    launch_id: string;
    provider: string;
  }

  const getNews = async () => {
    try {
      const response = await fetch(
        "https://api.spaceflightnewsapi.net/v4/articles"
      );
      if (response.ok) {
        const data = await response.json();
        setNewsData(data.results);
      } else {
        throw new Error("Errore nel recupero dati");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <main>
      {newsData && (
        <Container>
          <Row className="justify-content-center">
            {newsData.map((result, i) => (
              <Col xs={12} md={6} key={i} className="mb-2">
                <Card
                  className="h-100"
                  onClick={() => navigate("/details/" + result.id)}
                >
                  <Card.Img
                    variant="top"
                    src={result.image_url}
                    style={{ height: "18rem", width: "100%" }}
                    className="border border-bottom-1"
                  />
                  <Card.Body>
                    <Card.Title>{result.title}</Card.Title>
                    <div className="d-flex justify-content-between align-items-baseline">
                      <Card.Text>{result.authors.name}</Card.Text>
                      <Card.Text>{result.published_at.slice(0, 10)}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </main>
  );
};

export default News;
