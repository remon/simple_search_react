import React, { Component } from 'react';
import productImage from '../images/product_default.png';
class Product extends Component {
  render() {
    const { product } = this.props;
    return (
      <div
        className='col-6 col-lg-4  product_main_div'
        onClick={this.props.onClick}
      >
        <div className='product_wrapper'>
          <div className='img_wrapper'>
            <div className='product_price'>{product.price}$</div>
            <img src={productImage} alt='product title' />
            <div className='product_title'>
              <h6 className='pr_title'>{product.title} </h6>
            </div>
          </div>
          <div className='product_desc'>
            <p className='pr_desc'>{product.desccription}</p>
          </div>
          <div>
            <ul className='tags_area'>
              {product.tags.map((tag, i) => {
                return <li key={i}>{tag}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default Product;
