import React, { Component } from 'react';

class PopUp extends Component {
  state = {
    show: false
  };
  render() {
    const item = this.props.item;

    return (
      <div>
        <div className='popup_overlay' onClick={this.props.onClick}></div>
        <div className='popup_container'>
          <span className='close_popup' onClick={this.props.onClick}>
            x
          </span>
          <div className='popup_body'>
            <h3>{item.title}</h3>
            <p> {item.description}</p>
            <div className='popup_price'>{item.price}$</div>

            <ul className='popup_tags'>
              {item.tags.map((tag, i) => {
                return <li key={i}>{tag}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default PopUp;
