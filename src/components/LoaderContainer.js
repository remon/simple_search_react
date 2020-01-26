import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
function LoaderContainer() {
  return (
    <div className='loader-container'>
      <Loader type='Puff' color='#00BFFF' height={100} width={100} />
      <p> Loading Data ..</p>
    </div>
  );
}
export default LoaderContainer;
