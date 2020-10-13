import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { stringify } from "querystring";
import Badge from "react-bootstrap/Badge";
import { platform } from "os";

function App() {
  let querygame: string = "";
  let [searchResult, setSearchResult] = useState({});
  let [showDefaultSearch, setShowDefaultSearch] = useState(false);
  let tempCounter: number = 1;
  let [displayText, setDisplayText] = useState("");

  let searchGame = (querygame: string) => {
    setDisplayText(" showing result for ' " + querygame + " ' ");
    axios
      .get("https://api.rawg.io/api/games", {
        params: {
          search: querygame,
        },
      })
      .then((response) => {
        //console.log(response.data.results);
        searchResult = response.data.results;
        setSearchResult(response.data.results);
        // console.log(response.data.results);
        setShowDefaultSearch(true);
        Object.entries(searchResult).map((result: any) => {
          console.log("for queried search ", result[1].background_image);
        });
      });
  };

  useEffect(() => {
    console.log("loading useEffect after mounting");
    setDisplayText("showing all the trending games : ");
    axios({
      method: "get",
      url: "https://api.rawg.io/api/games",
    })
      .then((response) => {
        //console.log(response.data.results);
        searchResult = response.data.results;
        setSearchResult(response.data.results);
        // console.log(response.data.results);
        setShowDefaultSearch(true);
        Object.entries(searchResult).map((result: any) => {
          console.log(result[1].background_image);
        });
      })
      .catch((err) => {});
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col>
            {" "}
            <h1>Trending Video Games !</h1>
          </Col>
          <Col>
            <h3>
              powered by <strong>RAWG API</strong>
            </h3>
          </Col>
        </Row>
        <br />
        <Row>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Enter the Name of the Game !"
              aria-label="Enter the Name of the Game"
              aria-describedby="basic-addon2"
              onChange={(e: any) => {
                console.log(e.target.value);
                querygame = e.target.value;
              }}
            />
            <InputGroup.Append>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  searchGame(querygame);
                }}
              >
                Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Row>
        <br />
        <Row>
          <Col>{displayText} </Col>
        </Row>
        <br />
        {!showDefaultSearch && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        {showDefaultSearch &&
          Object.entries(searchResult).map((game: any) => (
            <Row>
              <Col key={game[1].name} xs={12} md={8}>
                <Badge variant="secondary"># {tempCounter++}</Badge>
                <Card>
                  <Card.Img
                    className="image"
                    variant="top"
                    src={game[1].background_image}
                  />
                  <Card.Body>
                    <Card.Text>
                      <strong>{game[1].name} </strong> &nbsp;
                      <Badge variant="primary">
                        &#9733; {game[1].rating} / {game[1].rating_top}
                      </Badge>
                      <div>
                        {" "}
                        rating : {game[1].rating} / {game[1].rating_top}
                      </div>
                      <div>
                        Platforms :{" "}
                        {game[1].platforms.map((platform: any) => (
                          <span>{platform.platform.name} ,</span>
                        ))}
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <br />
              </Col>
              <Col xs={6} md={4}></Col>
            </Row>
          ))}
      </Container>
    </React.Fragment>
  );
}

export default App;
