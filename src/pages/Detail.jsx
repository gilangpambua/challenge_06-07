import '../App'
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import { StarOutlined } from '@ant-design/icons';

export default function Detail() {
  const params = useParams()
  const [selectedMovie, setSelectedMovie] = useState([])
  const [open, setOpen] = useState(false)
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState(false);

  const getPoster = (posterpath) => {
    return `https://www.themoviedb.org/t/p/original${posterpath}`
  }
  
  const handleSearchResult = () => {
    setSearchResult(true);
  }

  const handleClick = () => {
    window.location.href = '/';
  }

  const detailPage = useCallback(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=481bd6077b5ecae8559330454a45470a`)
      .then((response) => {
        setSelectedMovie(response.data)
      })
      .catch((error) => console.log(error))
  },[params.id])

  useEffect(()=>{
    detailPage()
  },[detailPage])

  function searchMovies(e) {
    e.preventDefault();
    axios
      .get(`https://api.themoviedb.org/3/search/movie?api_key=481bd6077b5ecae8559330454a45470a&language=en-US&query=${search}&page=1&include_adult=false`)
      .then((response) => {setMovies(response.data.results);
      });
  }

  return (
    <div className='overflow-x-hidden'>
      <div className='mt-[10px] px-[20px] md:px-[100px] flex justify-between items-center absolute z-[2] w-full bg-transparent'>
        <div className=''>
          <h1 onClick={handleClick}><b className='movlist text-[red] text-[24px] md:text-[35px] '>Movielist</b></h1>
        </div>
        <div className='hidden md:block'>
        <form className='' onSubmit={(e) => { e.preventDefault(); searchMovies(e); handleSearchResult() }}>
          <input type={"text"} value={search} onChange={(e)=> { setSearch(e.target.value)}} placeholder={"What do you want to watch?"} className='searchInput'></input>
          <SearchOutlined type="submit" className="navsearch"/>
        </form>
        </div>
      </div>
      <img className='bg' src={getPoster(selectedMovie.poster_path)} alt={selectedMovie.original_title}></img>
      <div className='content px-[20px] md:px-[80px] w-full'>
        <h1 className='detailTitle font-bold md:pl-[20px] text-white pt-[100px] md:pt-[250px] text-[40px]'>{selectedMovie.original_title}</h1>
          <div className='detailGenre1 md:pl-[20px] max-w-[800px] text-[16px]'>
            {
              selectedMovie.genres?.map((gn) => (
                <p key={gn.id} className='detailGenre'>
                  {gn.name},
                </p>
              ))
            }
          </div>
        <p className=' md:pl-[20px] w-full max-w-[800px] text-[16px]'>{selectedMovie.overview}</p>
        <p><StarOutlined className='star md:pl-[20px] max-w-[800px] text-[16px]'/>{selectedMovie.vote_average} / 10</p>
        <Button type="primary" shape="round" danger onClick={() => setOpen(true)} className='buttonWatchDetail'><PlayCircleOutlined/>WATCH TRAILER</Button>
        <Modal title="Watch Trailer"centered></Modal>
      </div>
    </div>
  );
}