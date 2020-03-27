import React, { useState, useEffect } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from 'components/Config';
import { withRouter } from 'react-router-dom';
import MainImage from 'components/Common/MainImage';
import MovieInfo from './Sections/MovieInfo';

const MovieDetail = (props) => {

    // 주소창에서 movieId 가져옴.
    let movieId = props.match.params.movieId;
    const [Movie, setMovie] = useState(null);

    useEffect(() => {

        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response)
            })
    }, []);

    return (
        Movie &&
        <div style={{width: '100%', margin: 0}}>
            {/* Header */}
            <MainImage
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            />
            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                {/* Movie Info */}
                <MovieInfo movie={Movie}/>

                <br />
                {/* Actors Grid */}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button>Toggle Actor view</button>
                </div>


            </div>
        </div>
    );
}

export default withRouter(MovieDetail);
