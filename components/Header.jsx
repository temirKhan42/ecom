import React, { useState } from "react";
import Image from 'next/image';
import ModalCart from "./ModalCart";
import { useSelector } from "react-redux";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { amount } = useSelector((state) => state.cart);

  const handleCartClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <header className="mb-3">
        <div className="container flex ai-c">
          <div id="logo" className="logo">
            <Image src="/logo.svg" alt="Logo" height={20} width={136} />
          </div>
          <nav>
            <ul className="flex">
              <li><a href="#">Collections</a></li>
              <li><a href="#">Men</a></li>
              <li><a href="#">Women</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
          <div id="cart" className="cart">
            <Image src="/icon-cart.svg" alt="Cart" height={20} width={20} className="cart-icon" onClick={handleCartClick} />
            {amount > 0 ? <span className="cart-amount">{amount}</span> : null}
            {isModalOpen ? <ModalCart /> : null}
          </div>
          <div id="avatar">
            <img src="/image-avatar.png" alt="Avatar" className="avatar" />
          </div>
        </div>
      </header>
    </>
  );
}