import React, { Component } from 'react';
import Select from 'react-select';
import _ from 'lodash';

function getItemFromArray(arr, value) {
  let item = _.filter(arr, function(o) {
    return o.value === value;
  });

  if (item.length < 1) {
    item = arr[0];
  }
  return item;
}
class SearchForm extends Component {
  handleSelectChange = (type, v) => {};
  render() {
    const countryOptions = [
      { value: '', label: 'All Countries' },
      { value: 'United States', label: 'United States' },
      { value: 'Canada', label: 'Canada' },
      { value: 'Germany', label: 'Germany' },
      { value: 'United Kingdom', label: 'United Kingdom' },
      { value: 'Peru', label: 'Peru' },
      { value: 'China', label: 'China' }
    ];
    const priceOptions = [
      { value: '', label: 'All Prices' },
      { value: 'eq', label: 'Equal' },
      { value: 'gt', label: 'Greater Than' },
      { value: 'lt', label: 'Less Than' }
    ];
    const sortOptions = [
      { value: 'relevance', label: 'Relevance' },
      { value: 'newest', label: 'Newest First' },
      { value: 'oldest', label: 'Oldest First' },
      { value: 'lowest', label: 'Lowest Price' },
      { value: 'highest', label: 'Highest Price' }
    ];
    const { country, price_lq_eq, sort_by } = this.props.formData;
    const selectedCountry = getItemFromArray(countryOptions, country);
    const selectedPriceLq = getItemFromArray(priceOptions, price_lq_eq);
    const selectedSortBy = getItemFromArray(sortOptions, sort_by);
    return (
      <div className='col-md-3 col-sm-12'>
        <div className='form_wrapper'>
          <h3> Search</h3>
          <form onSubmit={this.props.onSubmit}>
            <div className='field'>
              <label>Search for keyword</label>
              <input
                name='term'
                onChange={this.props.onChange}
                value={this.props.formData.term}
                id='term'
              />
            </div>
            <div className='field'>
              <label>Country</label>
              <Select
                name='country'
                value={selectedCountry}
                onChange={e => this.props.onChangeState('country', e.value)}
                options={countryOptions}
              />
            </div>
            <div className='field'>
              <label>Price</label>
              <div className='col price_search'>
                <div className='row'>
                  <div className='col-sm-12 col-md-8'>
                    <Select
                      name='price_lq_eq'
                      value={selectedPriceLq}
                      onChange={e =>
                        this.props.onChangeState('price_lq_eq', e.value)
                      }
                      options={priceOptions}
                    />
                  </div>
                  <div className='col-sm-12 col-md-4'>
                    <input
                      name='price'
                      onChange={this.props.onChange}
                      value={this.props.formData.price}
                      id='price'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='field'>
              <label>Sort By</label>
              <Select
                name='sort_by'
                value={selectedSortBy}
                onChange={e => this.props.onChangeState('sort_by', e.value)}
                options={sortOptions}
              />
            </div>
            <div className='field form_btn_wrapper'>
              <button className='btn btn-warning'>Search</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchForm;
