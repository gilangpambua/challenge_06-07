import { Container, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from 'axios';
import React, { useEffect,useState } from "react";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const [crslMovie, setCrslMovie] = useState(null)

  const crsl1 = async () => {
    axios
      .get('https://api.themoviedb.org/3/movie/popular?api_key=481bd6077b5ecae8559330454a45470a')
      .then((response) => {
        console.log(response.data.results)
        setCrslMovie(response.data.results.slice(0,1))
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
      crsl1()
  }, [])

  return (
    <div className='h-[100vh]'>
      {
        crslMovie?.map((cr) => (
          <div className='h-[100vh] w-full  grid place-items-center'
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${cr.backdrop_path})`,
            backgroundSize: "cover", 
            backgroundPosition: "center",
            boxShadow: "0px 0px 0px 0px #00000040,inset 0 0 0 1000px rgba(0,0,0,.7)" }}>
            <Container className="p-4">
              <Row>
                <Col>
                  <div className="d-flex flex-column justify-content-center">
                    <Card className="text-center">
                      <Card.Header>Dashboard</Card.Header>
                      <Card.Body>
                        <Card.Title>My Profile</Card.Title>
                        <Card.Text>Hello, my name is {user?.name}</Card.Text>
                      </Card.Body>
                      <Card.Footer className="text-muted">{user?.email}</Card.Footer>
                    </Card>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        ))
      }
    </div>
  );
}

export default Dashboard;