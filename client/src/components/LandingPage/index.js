import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from 'components/Config';
import MainImage from './Sections/MainImage';
import styles from './styles.module.scss';

function LandingPage(props) {

  const [Movies, setMovies] = useState([]);
  const [MainMoiveImage, setMainMoiveImage] = useState(null);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    fetch(endpoint)
      .then(response => response.json())
      .then(response => {
        setMainMoiveImage(response.results[0])
        setMovies([response.results])
      })
  }, []);

  return (
    <div className={styles.mainContainer}>

      {/* Main Image */}

      {MainMoiveImage &&
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${MainMoiveImage.backdrop_path}`}
          title={MainMoiveImage.orginal_title}
          text={MainMoiveImage.overview}

        />
      }

      <div className={styles.subTitleContainer}>

        <h2>Movies by latest</h2>
        <hr />

        {/* Moive Grid Cards */}

      </div>

      <div className={styles.subContainer}>
        <button>Load More</button>
      </div>

    </div>
  )
}

export default LandingPage;
