'use client';
import Navbar from "@/app/components/Navbar"
import axios from "axios"
import { Tooltip } from "flowbite-react";
import { useEffect, useState } from "react";
import PageNumber from "./components/PageNumber";
import SearchList from "./components/SearchList";

export default function Home() {
  const [productName, setproductName] = useState('');
  const [quantity, setquantity] = useState();
  const [message, setmessage] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const [list, setlist] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchBtn, setsearchBtn] = useState(false)
  const [productValue, setProductValue] = useState('');
  const [searchBtnClicked, setsearchBtnClicked] = useState(false)

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchValue(value);

    try {
      if (value) {
        const response = await axios.get(`/api/search?query=${value}`);
        const data = await response.data;
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error performing search:', error);
      setSearchResults([]);
    }
  };


  const getProductList = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      setlist(response.data);
    } catch (err) {
      console.log('Cannot get product list');
    }
  }
  useEffect(() => {
    getProductList();
  }, [])

  const handleAddProduct = async () => {
    try {
      const data = {
        name: productName,
        quantity: quantity
      }
      const response = await axios.post('http://localhost:3000/api/create', data);
      if (response.status === 200) {
        setmessage('Product created Sucessfully');
        setproductName('');
        setquantity(0);
        getProductList();
      }
      console.log(response.status);
    }
    catch (err) {
      setmessage('Failed to create Product');
    }
  }

  const HandleSearchProduct = () => {
    let element = null;
    useEffect(() => {
      // console.log(productValue);
    }, [productValue])
    for (let i = 0; i < searchResults.length; i++) {
      if (searchResults[i].name === productValue && productValue !== '') {
        element = searchResults[i];
        return (
          // <div>{element.name}{element.quantity}</div>
          <tbody>
            <tr
              className={` "bg-gray-100""
                } table-row`}
            >
              <td className="p-2 border-b bg-gray-100">
                <input
                  className={`bg-gray-100
                     border-none input-field`}
                  type="text"
                  disabled
                  value={element.name}
                />
              </td>
              <td className="p-2 border-b bg-gray-100">
                <input
                  className={`bg-gray-100
                      border-none input-field`}
                  type="number"
                  disabled
                  value={element.quantity}
                />
              </td>
              <td className="p-2 border-b bg-gray-100">
                <Tooltip content={`Edit ${element.name} details`}>
                  <svg
                    onClick={() => {
                      console.log(`Editing ${product.name} details`);
                      handleEdit(element.name, element.quantity);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    width="32px"
                    height="32px"
                    data-tooltip-target="tooltip-dark"
                    className="cursor-pointer ml-4 hover:bg-gray-200"
                  >
                    <path d="M 23.90625 3.96875 C 22.859375 3.96875 21.8125 4.375 21 5.1875 L 5.1875 21 L 5.125 21.3125 L 4.03125 26.8125 L 3.71875 28.28125 L 5.1875 27.96875 L 10.6875 26.875 L 11 26.8125 L 26.8125 11 C 28.4375 9.375 28.4375 6.8125 26.8125 5.1875 C 26 4.375 24.953125 3.96875 23.90625 3.96875 Z M 23.90625 5.875 C 24.410156 5.875 24.917969 6.105469 25.40625 6.59375 C 26.378906 7.566406 26.378906 8.621094 25.40625 9.59375 L 24.6875 10.28125 L 21.71875 7.3125 L 22.40625 6.59375 C 22.894531 6.105469 23.402344 5.875 23.90625 5.875 Z M 20.3125 8.71875 L 23.28125 11.6875 L 11.1875 23.78125 C 10.53125 22.5 9.5 21.46875 8.21875 20.8125 Z M 6.9375 22.4375 C 8.136719 22.921875 9.078125 23.863281 9.5625 25.0625 L 6.28125 25.71875 Z" />
                  </svg>
                </Tooltip>
              </td>
            </tr>
          </tbody>
        )
      }
    }

    return (
      <tbody>
        <tr>
          <td colSpan="2" className="p-2 text-center">
            Please enter search keywords to find desired products
          </td>
        </tr>
      </tbody>
    )

  }
  const handleEdit = async (product, quantity) => {
    // console.log(`Editing ${product} ${ quantity}`);
    return (
      <div>Hiiiiiiiiiiiiiiiiiiiiiiiiii</div>
    )
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setIsHidden(true);
        setmessage('');
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);



  return (
    <>
      <Navbar />
      {
        message ? (
          <div className={`text-center font-semibold ${!message && isHidden ? 'hidden' : ''} text-${message.includes('Failed') ? 'red' : 'green'}-600 text-sm `}>
            {message}
          </div>
        ) : null
      }
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-2"> Add a Product</h1>
          <div className="flex flex-col md:flex-row">
            <input
              type="text"
              className="w-full md:w-1/3 px-2 py-1 border border-gray-400 rounded-l mb-2 md:mb-0"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setproductName(e.target.value)}
            />
            <input
              type="number"
              className="w-full md:w-1/3 px-2 py-1 border border-gray-400 rounded-l md:rounded-none mb-2 md:mb-0 md:ml-2"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setquantity(e.target.value)}
            />
            <button
              className="w-full md:w-auto ml-0 md:ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400"
              onClick={handleAddProduct}
            >
              Add
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Search Product List</h2>
          <div className="flex flex-row">
            <input
              type="text"
              className=" w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500"
              placeholder="Search Product List"
              onChange={handleSearch}
              value={searchValue}
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="mx-4 cursor-pointer" onClick={() => {
              // if(searchBtnClicked) {setsearchBtnClicked(false);}
              // else {setsearchBtnClicked(true);}
              // console.log(searchBtnClicked);
              setsearchBtnClicked(true);
            }
            }
              width="32px" height="32px">
              <path d="M 21 3 C 11.654545 3 4 10.654545 4 20 C 4 29.345455 11.654545 37 21 37 C 24.701287 37 28.127393 35.786719 30.927734 33.755859 L 44.085938 46.914062 L 46.914062 44.085938 L 33.875 31.046875 C 36.43682 28.068316 38 24.210207 38 20 C 38 10.654545 30.345455 3 21 3 z M 21 5 C 29.254545 5 36 11.745455 36 20 C 36 28.254545 29.254545 35 21 35 C 12.745455 35 6 28.254545 6 20 C 6 11.745455 12.745455 5 21 5 z" />
            </svg>
          </div>
          {searchResults.length > 0 && searchValue && (
            <ul className="mt-2 px-4 py-2 bg-white border border-gray-400 rounded list">
              {searchResults.map((product) => (
                <li className="cursor-pointer hover:bg-slate-100" key={product._id} onClick={() => {
                  setsearchBtn(true);
                  setProductValue(product.name);
                }}>{product.name}</li>
              ))}
            </ul>
          )}

          {
            searchValue && searchResults.length === 0 && (
              <ul className="mt-2 px-4 py-2 bg-white border border-gray-400 rounded list">
                <li className="flex flex-row items-center justify-center"><img src="1492.gif" alt="Loading.." className="h-8" />
                  Searching....</li>
              </ul>
            )
          }

          <h2 className="text-xl font-bold mb-2 mt-10">Product List</h2>
          <div className="table-container">
            <table className="w-full table-auto border border-gray-400">
              <thead>
                <tr>
                  <th className="p-2 border-b">Product Name</th>
                  <th className="p-2 border-b">Quantity</th>
                  <th className="p-2 border-b"></th>
                </tr>
              </thead>
              {searchBtnClicked && !searchBtn ? (
                <SearchList resultList={searchResults} />
              ) : (
                  !searchBtn ? (
                    <PageNumber list={list} />
                  ) : (
                    <HandleSearchProduct />
                  )
              )}
            </table>
          </div>

        </div>
      </div>
    </>
  )
}
