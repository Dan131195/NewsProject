import { useNavigate } from "react-router-dom";
import { News } from "../types/News";
import { useEffect, useState, useRef } from "react";
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";

const CarouselNews = () => {
  const [newsData, setNewsData] = useState<News[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const getNews = async () => {
    try {
      const response = await fetch(
        "https://api.spaceflightnewsapi.net/v4/articles"
      );
      if (response.ok) {
        setIsLoading(false);
        const data = await response.json();
        setNewsData(data.results);
      } else {
        throw new Error("Errore nel recupero dati");
      }
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    setTimeout(getNews, 1000);
  }, []);

  const handleNext = () => {
    if (currentIndex < newsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    if (trackRef.current) {
      const slideWidth = trackRef.current.offsetWidth;
      trackRef.current.style.transform = `translateX(-${
        currentIndex * slideWidth
      }px)`;
    }
  }, [currentIndex]);

  return (
    <>
      {isError && (
        <Alert variant="danger" className="w-75 m-auto mt-5 text-center">
          ERROR: Errore nel recupero dati...
        </Alert>
      )}
      {isLoading && !isError ? (
        <Container className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
        </Container>
      ) : (
        <Container>
          <Row className="justify-content-center mt-2">
            <Col xs={12} md={8}>
              <div className="carousel">
                <div className="carousel-track-container">
                  <div
                    className="carousel-track d-flex"
                    ref={trackRef}
                    style={{
                      transition: "transform 0.5s ease-in-out",
                    }}
                  >
                    {newsData.map((result, index) => (
                      <div
                        key={index}
                        className="carousel-slide"
                        style={{ flex: "0 0 100%" }}
                      >
                        <img
                          src={result.image_url}
                          alt={result.title}
                          className="carousel-img"
                        />
                        <button
                          onClick={() => navigate("/details/" + result.id)}
                          className="btn btn-success"
                          id="myButton"
                        >
                          Vedi Dettagli
                        </button>
                        <h2 className="carousel-title text-center">
                          {result.news_site} — {result.authors[0].name}
                        </h2>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="d-flex justify-content-between w-75 m-auto mt-2">
                  <Button
                    className="prev btn btn-dark"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                  >
                    <ArrowLeft />
                  </Button>
                  <Button
                    className="next btn btn-dark"
                    onClick={handleNext}
                    disabled={currentIndex === newsData.length - 1}
                  >
                    <ArrowRight />
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default CarouselNews;

{
  /*  <Carousel>
    <Carousel.Item>            
      {newsData.map((result) => (            
        <img src={result.image_url} alt="" className="myImg" />            
      ))}            
    </Carousel.Item>            
    <Carousel.Item>
      {newsData.map((result) => (          
        <img src={result.image_url} alt="" className="myImg" />          
      ))}         
    </Carousel.Item>            
  </Carousel> */
}
