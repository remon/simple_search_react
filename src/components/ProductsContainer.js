import React, { Component } from 'react';
import Product from './Product';
import ReactPaginate from 'react-paginate';
import '../paginate.css';
import PopUp from './PopUp';
function NoProducts() {
  return (
    <div className='col no_products'>
      <div className='alert alert-warning' role='alert'>
        There are no products matching your search
      </div>
    </div>
  );
}

class ProductsContainer extends Component {
  state = {
    selectedProduct: null
  };
  handleClick = (e, i) => {
    e.preventDefault();

    //console.log(this.props.products[i]);
    const selectedProduct = this.props.products[i];
    this.setState({
      selectedProduct: selectedProduct
    });
  };

  handlePageClick = e => {
    this.props.setCurrentPage(e.selected);
  };
  hidePoup = e => {
    this.setState({
      selectedProduct: null
    });
  };
  render() {
    const { products, page, total_products, total_pages } = this.props;
    const selectedProduct = this.state.selectedProduct;
    let noProducts = false;
    if (total_products < 1) {
      noProducts = true;
    }

    return (
      <div className='container'>
        {selectedProduct ? (
          <PopUp item={selectedProduct} onClick={this.hidePoup} />
        ) : (
          ''
        )}
        {noProducts ? (
          <NoProducts />
        ) : (
          <div className='products_header'>
            <h4> Products({total_products})</h4>
          </div>
        )}

        <div className='row'>
          {products.map((product, i) => {
            return (
              <Product
                onClick={e => this.handleClick(e, i)}
                product={product}
                key={i}
              />
            );
          })}
        </div>

        {total_pages > 1 ? (
          <div className='products_paginate'>
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={total_pages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              forcePage={page - 1}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
export default ProductsContainer;
