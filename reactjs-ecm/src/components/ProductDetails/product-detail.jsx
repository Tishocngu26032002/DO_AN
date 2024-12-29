import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/header.jsx";
import { PiShoppingCart } from "react-icons/pi";
import { fetchProductDetail } from "../../services/product-service.js";
import { getCategory } from "../../services/category-service.js";
import Footer from "../Footer/footer.jsx";
import { PiMinusBold, PiPlusBold } from "react-icons/pi";
import { authLocal, userIdLocal, getToken } from "../../util/auth-local.js"; // Import the auth methods
import {
  getCarts,
  createCart,
  updateCart,
} from "../../services/cart-service.js"; // Assuming you have a cart service to handle API calls

// Tách Image component
const Image = ({ mainImage, setMainImage, productImages }) => {
  return (
    <div className="single-pro-image md:mr-12 md:w-1/3 xl:mr-12 xl:w-2/3">
      {/* Ảnh chính */}
      <img src={mainImage} className="mb-2 w-full" alt="Main Product" />
      {/* Nhóm ảnh nhỏ */}
      <div className="small-img-group mt-1 flex justify-between">
        {productImages.map((img, index) => (
          <div
            key={index}
            className={`small-img-col w-24p cursor-pointer ${
              img === mainImage ? "border-2 border-blue-500" : ""
            }`}
            onClick={() => setMainImage(img)}
          >
            <img src={img} className="w-full" alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [carts, setCarts] = useState([]);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Không cho phép số âm
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getCategory(1, 20);
        setCategory(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await fetchProductDetail(productId);
        if (data) {
          setProduct(data);
          setMainImage(data.url_images || "");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const getCartsOnPage = async () => {
      try {
        let token = getToken();
        if (token) {
          let userId = userIdLocal.getUserId();
          userId = userId.replace(/^"|"$/g, "");

          if (userId) {
            const cartsData = await getCarts(userId, token); // Lấy giỏ hàng từ API
            setCarts(cartsData.data.data.cart); // Cập nhật giỏ hàng
          }
        }
      } catch (error) {
        console.log("Error fetching carts:", error);
      }
    };

    getCartsOnPage();
  }, []);

  const handleAddToCart = async () => {
    try {
      let token = getToken();
      if (token) {
        let userId = userIdLocal.getUserId();
        userId = userId.replace(/^"|"$/g, "");

        if (userId) {
          const cartIndex = carts.findIndex(
            (cart) => cart.product_id === productId,
          );

          const cartData = {
            quantity: quantity,
            product_id: productId,
            user_id: userId,
          };

          if (cartIndex !== -1) {
            await updateCart(
              {
                ...carts[cartIndex],
                quantity: carts[cartIndex].quantity + quantity,
              },
              token,
            );
          } else {
            await createCart(cartData, token);
          }

          const cartsData = await getCarts(userId, token);
          setCarts(cartsData.data.data.cart);
          alert("Product added to cart!");
        } else {
          alert("User ID is missing. Please log in.");
        }
      } else {
        alert("Token is missing. Please log in.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found.</div>;

  // const productImages = product.images || [product.url_images];
  const productImages = Array(3).fill(product.url_images);

  return (
    <>
      <Header />
      <section
        id="page-header"
        className="h-52 bg-cover bg-center"
        style={{ backgroundImage: `url("/images/banner/chk1.jpg")` }}
      >
        <div className="flex h-full w-full items-center justify-center bg-[rgba(8,28,14,0.79)] text-center">
          <p className="text-white">
            HOME /{" "}
            {category.find((category) => category.id === product.category_id)
              ?.name || "Không rõ"}{" "}
            / {product.name}
          </p>
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
          <h4 className="py-5 text-4xl font-bold text-[#006532]">
            {product.name}
          </h4>
          <h2 className="flex text-2xl font-semibold text-[#006532]">
            {/* {product.priceout}đ */}
            <p className="mr-1 mt-[2px] text-lg font-normal underline">đ</p>
            {new Intl.NumberFormat("vi-VN").format(product.priceout)}
          </h2>
          <div className="mt-4 flex">
            <div className="product__details__quantity">
              <div className="flex h-[48px] w-[140px] items-center rounded border-2 border-[#00653265] bg-white">
                <button
                  className="ml-[18px] mr-1 text-base font-normal text-gray-600 hover:bg-gray-300 focus:outline-none"
                  onClick={handleDecrease}
                >
                  <PiMinusBold />
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="mr-1 w-16 border-0 text-center text-base font-normal text-gray-600 focus:outline-none"
                />
                <button
                  className="text-base font-normal text-gray-600 hover:bg-gray-300 focus:outline-none"
                  onClick={handleIncrease}
                >
                  <PiPlusBold />
                </button>
              </div>
            </div>
            <button
              className="ml-4 h-12 rounded bg-[#006532] px-4 py-2 text-white"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
          <h4 className="pb-5 pt-10 text-2xl font-semibold text-[#777777]">
            Chi tiết sản phẩm
          </h4>
          <p className="text-l leading-[25px] text-[#777777]">
            {product.description}
          </p>
          <p className="text-l leading-[25px] text-[#777777]">
            Kho: {product.stockQuantity}{" "}
          </p>
          <p className="text-l leading-[25px] text-[#777777]">
            Bao: {product.weight}kg
          </p>
        </div>
      </section>

      <section
        id="product1"
        className="mt-10 bg-[#f9f9f9] py-10 pt-10 text-center"
      >
        <div className="text-[46px] font-semibold leading-[54px] text-[#006532]">
          Sản phẩm mới nhất
        </div>
        <div className="pro-container flex flex-wrap justify-evenly pt-5">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="pro ease shadow-lg hover:shadow-xl relative m-4 w-1/5 min-w-[250px] cursor-pointer rounded-2xl border border-[#cce7d0] bg-white p-3 transition duration-200"
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
                <h4 className="pt-2 text-lg font-bold text-[#006532]">$78</h4>
              </div>
              <a
                href="#"
                className="cart absolute bottom-5 right-2 flex h-10 w-10 items-center justify-center rounded-full border border-[#cce7d0] bg-[#e8f6ea] text-[#006532]"
              >
                <PiShoppingCart />
              </a>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetail;
