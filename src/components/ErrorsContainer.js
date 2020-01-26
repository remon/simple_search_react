import React, { Component } from 'react';

class ErrorContainer extends Component {
  render() {
    return (
      <div className='col no_products' onClick={this.props.onClick}>
        <div className='alert alert-danger'>
          There is an Error while Loading your data , click here to try again
        </div>
      </div>
    );
  }
}

export default ErrorContainer;
