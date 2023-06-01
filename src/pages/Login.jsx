import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/actions/auth";
import axios from 'axios';
import GoogleLogin from "../components/GoogleLogin";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [crslMovie, setCrslMovie] = useState(null)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const data = { email, password };

    dispatch(login(data, navigate));
  };

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
            <div className='h-[100vh] w-full grid place-items-center'
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${cr.backdrop_path})`,
            backgroundSize: "cover", 
            backgroundPosition: "center",
            boxShadow: "0px 0px 0px 0px #00000040,inset 0 0 0 1000px rgba(0,0,0,.7)" }}>
              <Container className="p-4" >
                <div className="bg-white max-w-[800px] rounded-[10px]">
                  <div className="flex space-between border-b-[1px] border-[gray] p-[15px]">
                      <h1 className='text_logres m-[0]'>Log In to Your Account</h1>
                  </div>
                    <div className="flex flex-col items-start gap-[20px] p-[15px]"> 
                      <Row>
                          <Col>
                          {" "}
                          <Form onSubmit={onSubmit}>
                              <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label>Email address</Form.Label>
                              <Form.Control
                                  className='border-[1px] border-[gray]'
                                  type="email"
                                  placeholder="Enter email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                              />
                              <Form.Text className="text-muted">
                                  We'll never share your email with anyone else.
                              </Form.Text>
                              </Form.Group>

                              <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                  className='border-[1px] border-[gray]'
                                  type="password"
                                  placeholder="Password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                              />
                              </Form.Group>
                              <Button type="submit" className='sbmt bg-[red] text-[white] border-[1px] rounded-[20px] p-[5px] px-[20px]'>
                              Submit
                              </Button>
                          </Form>
                          </Col>
                      </Row>
                    </div>
                      <Row>
                          <Col>
                          <div className="d-flex p-[5px] px-[14px] pb-[20px]">
                            <GoogleLogin buttonText={"Login with Google"}/>
                          </div>
                          </Col>
                      </Row>
                    </div>
              </Container>
            </div>
          ))
        }
    </div>   
  );
}

export default Login;
