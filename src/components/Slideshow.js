import React from 'react';


const Slideshow = (props) => {
        return (
          <div>
            <div className="slider">
              {props.imgs.map((img, i) => img.urlToImage === null ? null : <a key={i} href={img.url} target='_blank'><img className='news-images' src={img.urlToImage} alt={img.title} /></a> )}
            </div>
          {props.imgs.map((img, i) => <h2 key={i}>{img.desc}</h2>)}
          </div>
        );
}

export default Slideshow;