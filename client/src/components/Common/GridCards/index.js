import React from 'react';
import { Col } from 'antd';
import styles from './styles.module.scss';

function GridCards(props) {
  return (
    <Col lg={6} md={8} xs={24}> {/* 윈도우 사이즈에 맞춰서 제일 클때, 중간일때 제일 작을때 사이즈 조정해줌. (반응형) */}
        <div className={styles.card}>
            <a href={`/movie/${props.movieId}`}>
                <img className={styles.image} src={props.image} alt={props.movieName}/>
            </a>
        </div>
    </Col>
  );
}

export default GridCards;