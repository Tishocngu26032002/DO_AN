import  { useState } from 'react';
import Header from "../Header/header.jsx"
import { PiShoppingCart } from "react-icons/pi";
import productImage from "../../assets/product-details-1.jpg";
import productImage2 from "../../assets/f3.jpg";
import productImage3 from "../../assets/f4.jpg";
import QuantityInput from '../Button/QuantitySelectorButtom.jsx'

const Image = ({ mainImage, setMainImage, productImages }) => {
 
  const handleThumbnailClick = (img) => {
    setMainImage(img); // Update the main image to the clicked thumbnail
  };

  return (
    <div className="single-pro-image xl:w-full md:w-2/5 md:mr-12 xl:mr-12">
      <div >
        <img src={mainImage} className="w-full" alt="Main Product" id="MainImg" />
      </div>
      <div className="small-img-group flex justify-between mt-1">
        {productImages.map((img, index) => (
          <div key={index} className="small-img-col w-24p cursor-pointer" onClick={() => handleThumbnailClick(img)}>
            <img src={img} className="w-full" alt={`Product Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductDetail = () => {
  const productImages = [
    productImage,
    productImage2,
    productImage3,
    productImage,
  ];

  // State to hold the main product image
  const [mainImage, setMainImage] = useState(productImages[0]); // Initialize with the first image

  return (
    
    <div className="">
    
      <section id="prodetails" className="flex flex-col md:flex-row mx-10 xl:mx-28 mt-5 ">
        <Image mainImage={mainImage} setMainImage={setMainImage} productImages={productImages} />

        <div className="single-pro-details xl:w-full md:w-1/2 pt-8">
          <div className='font-bold'>Cám gà / Cám gà con / Lorem</div>
          <h4 className="py-7 font-semibold text-2xl">Lorem, ipsum dolor.</h4>
          <h2 className="font-semibold text-2xl text-red-600">$139</h2>
          <select className="block border border-black p-1 mt-4 mb-2">
            <option>Select Size</option>
            {["S", "M", "L", "XL", "XXL"].map((size, index) => (
              <option key={index}>{size}</option>
            ))}
          </select>
          <div className='flex mt-4'>
          <QuantityInput />
          <button className="bg-[#088178] h-12 text-white py-2 px-4 ml-4 rounded">Add to cart</button></div>
          <h4 className="pt-10 pb-5 font-semibold text-2xl">Product Details</h4>
          <p className="leading-[25px] text-l">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quis molestiae
            ullam distinctio minus quisquam cupiditate vero in laboriosam optio. ipsum dolor sit amet consectetur adipisicing elit. 
            Magni quo a dignissimos quasi, incidunt quae. Omnis 
            sapiente beatae totam asperiores nemo laudantium 
            doloribus autem culpa enim.
            ipsum dolor sit, amet consectetur
            adipisicing elit. Maiores non tempore tempora laborum
            accusantium fuga, est et laboriosam. Et, tempore.
          </p>
        </div>
      </section>

      <section id="product1" className="py-10 text-center">
        <div className='text-[46px] leading-[54px] text-[#222] font-semibold'>Newest Products</div>
        <div className="pro-container flex flex-wrap justify-evenly pt-5">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="pro w-1/5 min-w-[250px] p-3 border border-[#cce7d0] rounded-2xl cursor-pointer shadow-[20px_20px_30px_rgba(0,0,0,0.02)] m-4 transition ease duration-200 relative hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)]">
              <img src={productImage} alt={`Product ${index + 1}`} className="w-full rounded-xl" />
              <div className="des text-start pt-3">
                <span className="text-[#27278f] text-sm">Adidas</span>
                <h5 className="pt-2 text-[#1a1a1a] text-sm">Cotton shirts pure cotton</h5>
                <div className="star flex mt-2">
                  {[...Array(5)].map((_, starIndex) => (
                    <i key={starIndex} className="fas fa-star text-yellow-500 mr-1 text-xs"></i>
                  ))}
                </div>
                <h4 className="pt-2 text-lg font-bold text-[#088178] m">$78</h4>
              </div>
              <a href="#" className="cart w-10 h-10 flex items-center justify-center leading-10 rounded-full bg-[#e8f6ea] font-medium text-[#088178] border border-[#cce7d0] absolute bottom-5 right-2">
              <PiShoppingCart />
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
