import React from "react";
import Image from 'next/image';
import styles from '../styles/ModalProduct.module.css';
import classNames from "classnames/bind";
import { useMainImage } from '../utils/hooks/index.js';

function ModalProduct(props) {  
  const mainImage = useMainImage();
  const { images, close } = props;
  
  let cx = classNames.bind(styles);
  let container = cx({
    'box': true,
    'flex-column': true,
  });

  const handleNext = (e) => {
    const index = parseInt(mainImage.index);
    const i = index < 4 ? index : 0;
    mainImage.setIndex(e, i);
  };

  const handlePrev = (e) => {
    const index = parseInt(mainImage.index);
    const i = index > 1 ? index - 2 : 3;
    mainImage.setIndex(e, i);
  };

  return (
    <div className={styles.modalBack}>
      <div className={container}>

        <img src="/icon-close.svg" alt="Close" className={styles.close} onClick={() => close()} />

        <div className={styles.posRelative}>
          <div className={styles.prev} onClick={handlePrev}>
            <img src="/icon-previous.svg" alt="Previous" />
          </div>
          <div className={styles.next} onClick={handleNext}>
            <img src="/icon-next.svg" alt="Next" />
          </div>
          <img src={`/image-product-${mainImage.index}.jpg`} alt="" className={styles.image} />
        </div>
        <div>
          <ul className={styles.flex}>
            {images.map((imgSrc, i) => {
              return (
                <li key={i} onClick={(e) => mainImage.setIndex(e, i)}>
                  <img 
                    className={(i + 1) == parseInt(mainImage.index) ? 'active-img' : ''} 
                    src={imgSrc} 
                    alt="Image" 
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ModalProduct;