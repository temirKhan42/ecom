import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Header from '../../components/Header';
import ModalProduct from '../../components/ModalProduct.jsx';
import { addData } from '../../utils/slices/cartSlice.js';
import { connect } from "react-redux";
import { MainImageContext } from '../../utils/context';


class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainImageIndex: '1',
      data: {},
      amount: 0,
      isModalOpen: false,
      discountTimeLeft: '',
    };

    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.setMainImageIndex = this.setMainImageIndex.bind(this);
    this.handleMinus = this.handleMinus.bind(this);
    this.handlePlus = this.handlePlus.bind(this);
    this.setModal = this.setModal.bind(this);
    this.tick = this.tick.bind(this);
  }

  async componentDidMount() {
    async function fetchData() {
      const res = await fetch('/api/product/123');
      const data = await res.json();
      return data
    }
    const data = await fetchData();
    this.setState({ data });

    if (data.discount > 0) {
      this.timerId = setInterval(() => {
        const discountDate = new Date(data.discountDate);
        const currentDate = new Date();
        const period = discountDate - currentDate;
        const aDay = 86_400_000;
        const anHour = 3_600_000;
        const aMin = 60_000;
        const aSec = 1000;
        const days = Math.floor(period / aDay);
        const hours = Math.floor((period - (aDay * days)) / anHour);
        const mins = Math.floor((period - (aDay * days) - (anHour * hours)) / aMin);
        const secs = Math.floor((period - (aDay * days) - (anHour * hours) - (aMin * mins)) / aSec);
        this.tick(days, hours, mins, secs);
      }, 1000);
    }
  }

  tick(days, hours, mins, secs) {
    this.setState({ discountTimeLeft: `${days} : ${hours} : ${mins} : ${secs}` });
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  setMainImageIndex(e, index) {
    e.preventDefault();
    this.setState({ mainImageIndex: `${index+1}` })
  }

  handleMinus(e) {
    e.preventDefault();
    this.setState({ amount: this.state.amount - 1 })
  }

  handlePlus(e) {
    e.preventDefault();
    this.setState({ amount: this.state.amount + 1 })
  }

  handleAddToCart(e) {
    e.preventDefault();
    const addData = this.props?.addData;
    addData({ ...this.state.data, amount: this.state.amount });
  }

  setModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  render() {
    const images  = [
      '/image-product-1-thumbnail.jpg',
      '/image-product-2-thumbnail.jpg',
      '/image-product-3-thumbnail.jpg',
      '/image-product-4-thumbnail.jpg'
    ];
    
    const { title, cost, price, discount } = this.state.data;

    return (
      <MainImageContext.Provider value={{ 
        index: this.state.mainImageIndex, 
        setIndex: this.setMainImageIndex,
      }}>
        <Header /> 
        <main>
          <div className='container p-3 flex jc-sb'>
            <div id="left" className="left">
              <div className='mb-2'>
                <img 
                  src={`/image-product-${this.state.mainImageIndex}.jpg`} 
                  alt="Item" 
                  className='image-shown' 
                  onClick={this.setModal}
                />
              </div>
              <div>
                <ul className='images flex jc-sb'>
                  {images.map((src, i) => {
                    return (
                      <li key={i} onClick={(e) => this.setMainImageIndex(e, i)} >
                        <img 
                          className={(i + 1) == parseInt(this.state.mainImageIndex) ? 'active-img' : ''} 
                          src={src} 
                          alt="Item" 
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            
            <div id="right" className="right">
              <span className='title'>sneaker company</span>
              <h1 className='h1'>{title}</h1>
              <p>These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.</p>
              <div className='mb-2'>
                {discount > 0 ? (
                  <>
                    <p className="mb-1">
                      <span className='cost'>${cost}</span>
                      <span className='percent'>{discount}%</span>
                      <span className='timer'>Discount ends in {this.state.discountTimeLeft}.</span>
                    </p>
                    <p><strike><b>${price}</b></strike></p>
                  </>
                ) : (
                  <p className="mb-1">
                    <span className='cost'>${cost}</span>
                  </p>
                )}
              </div>
              <div className='flex'>
                <div className='cart-buttons'>
                  <button className='minus' onClick={(e) => this.handleMinus(e)}>-</button>
                  <span className='items-in-cart'>{this.state.amount}</span>
                  <button className='plus' onClick={(e) => this.handlePlus(e)}>+</button>
                </div>
                <button onClick={this.handleAddToCart} className='btn flex ai-c jc-c'>
                  <img src="/icon-cart2.svg" alt="icon" />
                  <span>Add to cart</span>
                </button>
              </div>
            </div>
          </div>
        </main>
        {this.state.isModalOpen ? <ModalProduct close={this.setModal} images={images} /> : null}
      </MainImageContext.Provider>
    );
  }
}

const mapDispatchToProps = {
  addData: addData,
};

export default connect(null, mapDispatchToProps)(Post);