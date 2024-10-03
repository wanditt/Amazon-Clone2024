import React, { useContext, useState, useEffect } from "react";
import classes from "./Orders.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, "users", user.uid, "orders");
      const ordersQuery = query(ordersRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(
        ordersQuery,
        (snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching orders: ", error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } else {
      setOrders([]);
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            <div>
              {orders.map((eachOrder) => (
                <div key={eachOrder.id}>
                  <hr />
                  <p>Order ID: {eachOrder.id}</p>
                  <div>
                    {eachOrder?.data?.basket?.map((orderItem, index) => (
                      // Ensure unique key for each orderItem and index
                      <ProductCard
                        flex={true}
                        product={orderItem}
                        key={`${eachOrder.id}-${index}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
