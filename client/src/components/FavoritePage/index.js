import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { USER_FAVORITE, IMAGE_BASE_URL } from 'components/Config';
import axios from 'axios';
import { Popover, Button } from 'antd';

const FavoritePage = () => {
    
    const [Favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavoritedMovie();
    }, []);

    const fetchFavoritedMovie = () => {
        axios.post(`${USER_FAVORITE}/getFavoritedMovie`, { userFrom: localStorage.getItem('userId')} )
        .then(response => {
            if(response.data.success) {
                setFavorites(response.data.favorites);
            } else {
                alert('영화 정보를 가져오는데 실패 했습니다.');
            }
        })
    }

    const onClickDelete = (movieId, userFrom) => {

        const variables = {
            movieId,
            userFrom
        }

        axios.post(`${USER_FAVORITE}/removeFromFavorite`, variables)
        .then(response => {
            if(response.data.success) {
                fetchFavoritedMovie(); // 성공하면 다시 favorite 리스트 가져옴.
            } else {
                alert("리스트에서 지우는데 실패했습니다.")
            }
        })
    }

    const renderCards = Favorites.map((favorite, index) => {
        
        const content = (
            <div>
                {favorite.moviePost ?
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}/> : "no image" }
            </div>
        )

        return (
        <tr key={index}>

            <Popover content={content} title={`${favorite.movieTitle}`}>
              <td>{favorite.movieTitle}</td>
            </Popover>

            <td>{favorite.movieRunTime}</td>
            <td><Button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</Button></td>
        </tr>)
    });

  return (
    <div style={{ width: '85%', margin: '3.5rem auto'}}>
      <h2> Favorite Movies </h2>
      <hr/>
      <table>
          <thead>
              <tr>
                  <th>Movie Title</th>
                  <th>Movie RunTime</th>
                  <td>Remove from favorites</td>
              </tr>
          </thead>
          <tbody>
            {renderCards}
          </tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
