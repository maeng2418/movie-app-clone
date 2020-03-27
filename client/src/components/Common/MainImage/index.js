import React from 'react';
import styles from './styles.module.scss';

const MainImage = (props) => {
  return (
    <div className={styles.mainContainer} style={{background: `linear-gradient(to bottom, rgba(0,0,0,0) 39%, rgba(0,0,0,0) 41%, rgba(0,0,0,0.65) 100%), url('${props.image}'), #1c1c1c`}}>
      <div>
          <div className={styles.titleContainer}>
              <h2 className={styles.title}>{props.title}</h2>
              <p className={styles.section}>{props.text}</p>
          </div>
      </div>
    </div>
  );
}

export default MainImage;