import Product from "./components/Product/Product";
import style from "./App.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "./components/context/appContext";
import { useEffect } from "react";

function App() {
  const {
    handleSortChange,
    filteredProducts,
    category,
    getCategories,
    numberOfProductsInCart,
    handleCategoryChange,
    sortCriteria,
    loading,
    fetchProductsByCategory,
    fetchAllProducts,
    setLoading,
  } = useAppContext();

  const { category: urlCategory } = useParams();

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/cart");
  };

  const handleCategoryPath = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    handleCategoryChange(event);
    if (selectedCategory === "") {
      navigate(`/products`);
    }
    navigate(`/products/${selectedCategory}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (!loading) {
        setLoading(true);
        try {
          if (urlCategory) {
            await fetchProductsByCategory(urlCategory);
          } else {
            await fetchAllProducts();
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProducts();
  }, [
    urlCategory,
    fetchProductsByCategory,
    fetchAllProducts,
    setLoading,
    loading,
  ]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className={style.background}>
            <div className={style.headline}>
              <h1 className={style.headTitle}>Shopping center</h1>
              <button className={style.cartButton} onClick={handleButtonClick}>
                <img
                  className={style.cartIcon}
                  src="./src/assets/cart.png"
                  alt="cart icon as a button"
                />
                <div className={style.numberOfProductsInCart}>
                  {numberOfProductsInCart}
                </div>
              </button>
            </div>
            <div className={style.optionsStyle}>
              Choose category:
              <select onChange={handleCategoryPath} value={category}>
                <option value="">All categories</option>
                {getCategories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() +
                      category.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className={style.optionsStyle}>
              Sorting by price:
              <select onChange={handleSortChange} value={sortCriteria}>
                <option value="">Nothing selected</option>
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
              </select>
            </div>
            <div className={style.main}>
              {filteredProducts.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
