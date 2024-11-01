import { useState } from "react";
import Header from "../Header/header.jsx";
import { PiShoppingCart } from "react-icons/pi";
import QuantityInput from "../Button/quantity-selector-buttom.jsx";
import Footer from "../Footer/footer.jsx";

const Image = ({ mainImage, setMainImage, productImages }) => {
  const handleThumbnailClick = (img) => {
    setMainImage(img); // Update the main image to the clicked thumbnail
  };

  return (
    <div className="single-pro-image md:mr-12 md:w-1/3 xl:mr-12 xl:w-2/3">
      <div>
        <img
          src={mainImage}
          className="w-full"
          alt="Main Product"
          id="MainImg"
        />
      </div>
      <div className="small-img-group mt-1 flex justify-between">
        {productImages.map((img, index) => (
          <div
            key={index}
            className="small-img-col w-24p cursor-pointer"
            onClick={() => handleThumbnailClick(img)}
          >
            <img
              src={img}
              className="w-full"
              alt={`Product Thumbnail ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductDetail = () => {
  const productImages = [
    "/images/product/range_cubes.jpg",
    "/images/product/range_cubes.jpg",
    "/images/product/range_cubes.jpg",
    "/images/product/range_cubes.jpg", // Bạn có thể thêm nhiều ảnh khác tại đây
  ];

  // State to hold the main product image
  const [mainImage, setMainImage] = useState(productImages[0]); // Initialize with the first image

  return (
    <div>
      <Header />
      <section
        id="page-header"
        className="h-52"
        style={{
          backgroundImage: `url("images/banner/chk1.jpg")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="bg-[rgba(8,28,14,0.79)] w-full h-full flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-bold text-white">CÁM LỢN</h2>
          <p className="text-white">HOME / CÁM LỢN / TÊN SP</p>
          <a href="#" className="to-top">
            <i className="fas fa-chevron-up"></i>
          </a>
        </div>
      </section>
      <section
        id="prodetails"
        className="mx-10 mt-5 flex flex-col md:flex-row xl:mx-28"
      >
        <Image
          mainImage={mainImage}
          setMainImage={setMainImage}
          productImages={productImages}
        />

        <div className="single-pro-details pt-8 md:w-2/3 xl:w-full">
          <h4 className="py-5 text-4xl font-bold text-[#006532]">Range Cube</h4>
          <h2 className="text-2xl font-semibold text-[#006532]">$139</h2>
          <select className="mb-2 mt-4 block border text-[#777777] border-[#006532] p-1">
            <option>Select Size</option>
            {["S", "M", "L", "XL", "XXL"].map((size, index) => (
              <option key={index}>{size}</option>
            ))}
          </select>
          <div className="mt-4 flex">
            <QuantityInput />
            <button className="ml-4 h-12 rounded bg-[#006532] px-4 py-2 text-white">
              Add to cart
            </button>
          </div>
          <h4 className="pb-5 pt-10 text-2xl font-semibold text-[#777777]">Product Details</h4>
          <p className="text-l leading-[25px] text-[#777777]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quis
            molestiae ullam distinctio minus quisquam cupiditate vero in
            laboriosam optio. ipsum dolor sit amet consectetur adipisicing elit.
            Magni quo a dignissimos quasi, incidunt quae. Omnis sapiente beatae
            totam asperiores nemo laudantium doloribus autem culpa enim. ipsum
            dolor sit, amet consectetur adipisicing elit. Maiores non tempore
            tempora laborum accusantium fuga, est et laboriosam. Et, tempore.
          </p>
        </div>
      </section>

      <section id="product1" className="py-10 text-center bg-[#f9f9f9] mt-10 pt-10">
        <div className="text-[46px] font-semibold leading-[54px] text-[#006532]">
          Newest Products
        </div>
        <div className="pro-container flex flex-wrap justify-evenly pt-5">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="pro ease relative m-4 w-1/5 min-w-[250px] cursor-pointer rounded-2xl border border-[#cce7d0] p-3 shadow-[20px_20px_30px_rgba(0,0,0,0.02)] transition duration-200 hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)] bg-white"
            >
              <img
                src="/images/products/262.png"
                alt={`Product ${index + 1}`}
                className="w-full rounded-xl"
              />
              <div className="des pt-3 text-start">
                <span className="text-sm text-[#006532]">Adidas</span>
                <h5 className="pt-2 text-sm text-[#1a1a1a]">
                  Cotton shirts pure cotton
                </h5>
                <div className="star mt-2 flex">
                  {[...Array(5)].map((_, starIndex) => (
                    <i
                      key={starIndex}
                      className="fas fa-star mr-1 text-xs text-yellow-500"
                    ></i>
                  ))}
                </div>
                <h4 className="m pt-2 text-lg font-bold text-[#006532]">$78</h4>
              </div>
              <a
                href="#"
                className="cart absolute bottom-5 -mb-3 right-2 flex h-10 w-10 items-center justify-center rounded-full border border-[#cce7d0] bg-[#e8f6ea] font-medium leading-10 text-[#006532]"
              >
                <PiShoppingCart />
              </a>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductDetail;
