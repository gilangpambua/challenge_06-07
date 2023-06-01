import '../App'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getProfile, logout } from "../redux/actions/auth";
import { useSelector, useDispatch } from "react-redux";


export default function Home() {
  const [setUser] = useState(null);
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState("")
  const [crslMovie, setCrslMovie] = useState(null)
  const [searchResult, setSearchResult] = useState(false);
  const setOpen = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { isLoggedIn, token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn && token) {
      dispatch(getProfile(navigate));
    }
  }, [dispatch, isLoggedIn, navigate, token]);

  const handleClick = () => {
    window.location.href = '/';
  }

  const fetchData = async () => {
    axios
      .get('https://api.themoviedb.org/3/movie/popular?api_key=481bd6077b5ecae8559330454a45470a&language=en-US&page=1')
      .then((response) => {
        console.log(response.data.results)
        setMovies(response.data.results)
      })
      .catch((error) => console.log(error))
  }

  const crsl1 = async () => {
    axios
      .get('https://api.themoviedb.org/3/movie/popular?api_key=481bd6077b5ecae8559330454a45470a')
      .then((response) => {
        console.log(response.data.results)
        setCrslMovie(response.data.results.slice(0, 3))
      })
      .catch((error) => console.log(error))
  }

  const getPosterURL = (posterpath) => {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath}`
  }

  const handleSearchResult = () => {
    setSearchResult(true);
  }

  function searchMovies(e) {
    e.preventDefault();
    axios
      .get(`https://api.themoviedb.org/3/search/movie?api_key=481bd6077b5ecae8559330454a45470a&language=en-US&query=${search}&page=1&include_adult=false`)
      .then((response) => {
        setMovies(response.data.results);
      });
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    crsl1()
  }, [])


  return (
    <div className='overflow-x-hidden'>
      <div className='mt-[10px] px-[20px] md:px-[100px] flex justify-between items-center absolute z-[2] w-full bg-transparent'>
        <div className=''>
          <h1 onClick={handleClick}><b className='movlist text-[red] text-[24px] md:text-[35px]'>MovieList</b></h1>
        </div>
        <div className='hidden md:block'>
          <form className='' onSubmit={(e) => { e.preventDefault(); searchMovies(e); handleSearchResult() }}>
            <input type={"text"} value={search} onChange={(e) => { setSearch(e.target.value) }} placeholder={"What do you want to watch?"} className='searchInput'></input>
            <SearchOutlined type="submit" className="navsearch" />
          </form>
        </div>
        <div>
            {isLoggedIn ? (
                <>
                <Link
                    to="/user/dashboard"
                    className="mr-4 text-white"
                >
                    Dashboard ({user?.name})
                </Link>
                <button className='link' onClick={() => dispatch(logout(navigate))}>Logout</button>
                </>
            ) : (
                <>
                <Link to="/login" className="link">
                    Login
                </Link>
                <Link to="/register" className="link">
                    Register
                </Link>
                </>
            )}
        </div>
      </div>

      <Carousel autoplay className='h-[100vh]'>
        {
          crslMovie?.map((cr) => (
            <div>
              <div className='px-[20px] md:px-[80px] ' style={{ height: '100vh', color: '#fff', backgroundImage: `url(https://image.tmdb.org/t/p/original${cr.backdrop_path})`, backgroundSize: "cover", backgroundPosition: "center", boxShadow: "0px 0px 0px 0px #00000040,inset 0 0 0 1000px rgba(0,0,0,.7)" }}>
                <h1 className='font-bold md:pl-[20px] text-white pt-[100px] md:pt-[250px] text-[40px]'>{cr.original_title}</h1>
                <p className='md:pl-[20px] max-w-[800px] text-[16px]'>{cr.overview}</p>
                <Button type="primary" shape="round" danger className='buttonWatch md:ml-[20px] flex items-center' onClick={() => setOpen(true)}><PlayCircleOutlined />WATCH TRAILER</Button>
                <Modal title="Watch Trailer"></Modal>
              </div>
            </div>
          ))
        }
      </Carousel>

      <div className=" flex justify-center">
        <div className='max-w-[1024px] px-[20px] lg:px-[0px] w-full flex justify-between'>
          <h1 className='my-[30px] text-[30px] '><b>{searchResult ? `Search Result "${search}"` : 'Popular Movie'}</b></h1>
          <button>See All Movie</button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className='px-[20px] lg:px-[0px] container max-w-[1024px] grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {
            movies.map((movie) => (
              <div key={movie.id}>
                <img
                  src={getPosterURL(movie.poster_path)}
                  alt={movie.original_title}
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(`/detail/${movie.id}`)
                  }}
                  className="w-full poster">
                </img>
              </div>
            ))
          }
        </div>
      </div>
      
    </div>
  );
}