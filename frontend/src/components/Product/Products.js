import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProducts } from '../../actions/productActions'
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import './Products.css'
import { useEffect, useState } from 'react'
import Pagination from 'react-js-pagination'
import { useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import Slider from '@material-ui/core/Slider'
import MetaData from '../layout/MetaData'

const categories = [
  "All",
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
]

const Products = ({ match }) => {

  const alert = useAlert()
  const params = useParams();
  let keyword = '';
  const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(state => state.products)
  const dispatch = useDispatch();


  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 90000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const setCurrentPageNo = (e) => setCurrentPage(e)
  const priceHanler = (e, newPrice) => setPrice(newPrice)

  useEffect(() => {
    keyword = params.keyword
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProducts(keyword, currentPage, price, category, ratings))

  }, [dispatch, params.keyword, alert, error, currentPage, price, category, ratings])

  let count = filteredProductsCount;
  return (
    <>
      {loading ? <Loader /> :

        <>
          <MetaData title="PRODUCTS---BHARATECOM" />
          <h2 className='productHeading'>Products</h2>
          <div className="products" >
            {
              products &&
              products?.map(product => <ProductCard key={product._id} product={product} />)
            }
          </div>



          <div className="filterBox">

            <h4>
              Price
            </h4>
            <Slider
              value={price}
              onChange={priceHanler}
              valueLabelDisplay="auto"
              aria-labelledby='range-slider'
              min={0}
              max={25000}
            />


            <h4>
              Categories
            </h4>
            <ul className="categoryBox">
              {
                categories.map((category) => (
                  <li
                    className='category-link'
                    key={category}
                    onClick={() => setCategory(category === 'All' ? "" : category)}
                  >
                    {category}
                  </li>
                ))
              }
            </ul>

            <fieldset>
              <legend><h4>Ratings Above</h4></legend>

              <Slider
                value={ratings}
                onChange={(e, newRatings) => setRatings(newRatings)}
                aria-labelledby='continuous-slider'
                valueLabelDisplay='auto'
                min={0}
                max={5}
              />

            </fieldset>

          </div>



          {/* Pagination */}
          {
            resultPerPage < productsCount &&
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"

              />
            </div>
          }

        </>


      }
    </>
  )
}

export default Products
