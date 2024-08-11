import "./App.css";

import { useState, useEffect } from "react";

const getData = async () => {
  const url = "https://stackhubs-backend.onrender.com/";

  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

const apiStatusConstants = {
  onSuccess: "SUCCESS",
  onFailure: "FAILURE",
  onLoading: "LOADING",
};

function App() {
  const [data, setData] = useState({
    buyerData: [],
    sellerData: [],
    completedOrderData: [],
  });

  const [orderType, setOrderType] = useState("buyer");

  const [quantity, setQuantity] = useState("");

  const [price, setPrice] = useState("");

  const [apiStatus, setApiStatus] = useState(apiStatusConstants.onLoading);

  const [errMsg,setErrorMsg] = useState("")

  useEffect(() => {
    setApiStatus(apiStatusConstants.onLoading);

    const fetchData = async () => {
      const stockData = await getData();
      setApiStatus(apiStatusConstants.onSuccess);
      setData(stockData);
    };
    fetchData();
  }, []);

  const onChangeOrderType = (event) => {
    setOrderType(event.target.value);
  };

  const onChangeQnty = (event) => {
    setQuantity(event.target.value);
  };

  const onchangePrice = (event) => {
    setPrice(event.target.value);
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();

    if (price !== "" && price !== "") {
      setApiStatus(apiStatusConstants.onLoading);
      const url = "https://stackhubs-backend.onrender.com/add-order";

      const orderData = {
        type: orderType,
        price,
        qty: quantity,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(orderData),
      });

      console.log(response);
 
      if(response.status === 200)
      {
        const newData = await getData();
        setData(newData);
        setApiStatus(apiStatusConstants.onSuccess);

        setPrice("");
        setQuantity("");
      }else{
        setErrorMsg(await response.text())
        setApiStatus(apiStatusConstants.onSuccess);
        setPrice("");
        setQuantity("");
      }
    }
  };



  return (
    <div className="App">
      <form id="orderForm" onSubmit={onSubmitForm} className="order-form">
        <div className="order-type">
          <label htmlFor="type" className="label label-order">
            Order Type :
          </label>
          <select
            className="form-select"
            onChange={onChangeOrderType}
            id="type"
            name="type"
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <div className="first-card">
          <label htmlFor="qty" className="label">
            Quantity:
          </label>
          <input
            type="number"
            className="form-control"
            id="qty"
            name="qty"
            value={quantity}
            required
            onChange={onChangeQnty}
          ></input>

          <label htmlFor="price" className="label">
            Price:
          </label>

          <input
            type="number"
            step="0.01"
            id="price"
            name="price"
            className="form-control "
            required
            onChange={onchangePrice}
            value={price}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Place Order
        </button>
      </form>

      {errMsg.length !== 0 && <p>{errMsg}</p>}

      {/* Table to display fetched data */}

      {apiStatus === apiStatusConstants.onLoading ? (
        <div className="spinner-card">
          <div className="spinner-border text-primary " role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <p className="table-head">Pending Order Table</p>
          <div className="data-tables">
            <div>
              <table className="table table-bordered ">
                <thead>
                  <tr>
                    <th className="text-success">Buyer Quantity</th>
                    <th className="text-success">Buyer Price</th>
                  </tr>
                </thead>
                <tbody>
                  {data.buyerData.length !== 0 &&
                    data.buyerData.map((buyer) => (
                      <tr key={buyer.id}>
                        <td className="text-success">{buyer.buyer_qty}</td>
                        <td className="text-success">{buyer.buyer_price}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="text-danger">Seller Price</th>
                    <th className="text-danger">Seller Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {data.sellerData.length !== 0 &&
                    data.sellerData.map((seller) => (
                      <tr key={seller.id}>
                        <td className="text-danger">{seller.seller_price}</td>
                        <td className="text-danger">{seller.seller_qty}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <p className="table-head">Completed Order Table</p>
            <table className="table table-bordered complete-order-table">
              <thead>
                <tr>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {data.completedOrderData.length > 0 ? (
                  data.completedOrderData.map((order) => (
                    <tr key={order.id}>
                      <td>{order.price}</td>
                      <td>{order.qty}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No completed orders</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
