import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from 'components/Config';
import MainImage from 'components/Common/MainImage';
import GridCards from 'components/Common/GridCards';
import { Row } from 'antd';
import styles from './styles.module.scss';

function LandingPage(props) {

  const [Movies, setMovies] = useState([]);
  const [MainMoiveImage, setMainMoiveImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    fetchMovies(endpoint);

  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then(response => response.json())
      .then(response => {
        setMovies([...Movies, ...response.results]);
        if (!MainMoiveImage) setMainMoiveImage(response.results[0]);
        setCurrentPage(response.page);
      }
      )
  };

  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
    fetchMovies(endpoint)
  }

  return (
    <div className={styles.mainContainer}>

      {/* Main Image */}

      {MainMoiveImage &&
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${MainMoiveImage.backdrop_path}`}
          title={MainMoiveImage.original_title}
          text={MainMoiveImage.overview}

        />
      }

      <div className={styles.subTitleContainer}>

        <h2>Movies by latest</h2>
        <hr />

        {/* Moive Grid Cards */}

        <Row gutter={[16, 16]}> {/* 카드 위 아래 여백 */}
          {Movies && Movies.map((movie, index) => (
            <React.Fragment key={index}>
              <GridCards
                landingPage
                image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                movieId={movie.id}
                moiveName={movie.orginal_title}
              />
            </React.Fragment>
          ))}
        </Row>


      </div>

      <div className={styles.subContainer}>
        <button onClick={loadMoreItems}>Load More</button>
      </div>

    </div>
  )
}

export default LandingPage;
