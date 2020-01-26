import React, { Component } from 'react';
import SearchForm from './components/SearchForm';
import { BrowserRouter, Redirect } from 'react-router-dom';
import ProductsContainer from './components/ProductsContainer';
import axios from 'axios';
import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import LoaderContainer from './components/LoaderContainer';
import ErrorsContainer from './components/ErrorsContainer';

class App extends Component {
  state = {
    term: '',
    price: '',
    country: '',
    sort_by: '',
    price_lq_eq: '',
    products: [],
    page: 1,
    total_pages: null,
    total_products: null,
    doneSearch: false,
    isLoadingData: true,
    noErrors: true
  };

  setCurrentPage = page => {
    //console.log(page);
    this.setState(
      {
        page: page + 1,
        redirect: true,
        isLoadingData: true,
        noErrors: true
      },
      () => {
        this.loadingData();
      }
    );
  };
  changeState = (type, value) => {
    this.setState({
      [type]: value
    });
  };

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);

    let term = '',
      price = '',
      country = '',
      sort_by = '',
      price_lq_eq = '',
      page = 1;
    if (urlParams.get('term') != null) {
      term = urlParams.get('term');
    }
    if (urlParams.get('price') != null) {
      price = urlParams.get('price');
    }
    if (urlParams.get('country') != null) {
      country = urlParams.get('country');
    }
    if (urlParams.get('sort_by') != null) {
      sort_by = urlParams.get('sort_by');
    }
    if (urlParams.get('price_lq_eq') != null) {
      price_lq_eq = urlParams.get('price_lq_eq');
    }
    if (urlParams.get('page') != null) {
      page = urlParams.get('page');
    }

    this.setState(
      {
        redirect: false,
        term,
        price,
        country,
        sort_by,
        price_lq_eq,
        page
      },
      () => {
        this.loadingData();
      }
    );
  }
  handleError = e => {
    e.preventDefault();

    this.setState(
      {
        isLoadingData: true,

        noErrors: true
      },
      () => {
        this.loadingData();
      }
    );
  };
  loadingData = () => {
    const api_url =
      'https://vanhack-project-search.herokuapp.com/api/products.json';

    const getQueryValues = _.omit(this.state, [
      'total_pages',
      'doneSearch',
      'products',
      'redirect',
      'isLoadingData',
      'noErrors',
      'total_products'
    ]);
    const queryValues = new URLSearchParams(getQueryValues).toString();

    axios
      .get(api_url + '?' + queryValues)
      .then(res => {
        const data = res.data;

        this.setState({
          redirect: false,
          noErrors: true,
          isLoadingData: false,
          products: data.products,
          page: data.current_page,
          total_pages: data.total_pages,
          total_products: data.total_products
        });
      })
      .catch(e => {
        this.setState({
          noErrors: false
        });
      });
  };
  onSubmit = e => {
    e.preventDefault();

    this.setState(
      {
        redirect: true,
        products: [],
        isLoadingData: true,
        page: 1,
        total_pages: null,
        total_products: null,
        noErrors: true
      },
      () => {
        this.loadingData();
      }
    );
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const mystate = this.state;
    const {
      isLoadingData,
      total_products,
      total_pages,
      redirect,
      products,
      page,
      noErrors
    } = mystate;
    const getQueryValues = _.omit(mystate, [
      'total_pages',
      'doneSearch',
      'products',
      'redirect',
      'noErrors',
      'total_products',
      'isLoadingData'
    ]);
    const query = new URLSearchParams(getQueryValues).toString();
    console.log('produstc are' + products);
    return (
      <BrowserRouter>
        <Header />
        <div className='container-fluid main-container'>
          <div className='row'>
            <SearchForm
              formData={mystate}
              onChange={this.handleChange}
              onChangeState={this.changeState}
              onSubmit={this.onSubmit}
            />
            <div className='col-md-9 col-sm-12'>
              {noErrors ? '' : <ErrorsContainer onClick={this.handleError} />}
              {isLoadingData && noErrors ? <LoaderContainer /> : ''}
              {!isLoadingData && noErrors ? (
                <ProductsContainer
                  setCurrentPage={this.setCurrentPage}
                  page={page}
                  products={products}
                  total_pages={total_pages}
                  total_products={total_products}
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>

        {redirect ? (
          <Redirect
            to={{
              pathname: '/',
              search: '?' + query
            }}
          />
        ) : (
          ''
        )}
      </BrowserRouter>
    );
  }
}

export default App;
