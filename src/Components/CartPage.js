import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css";
import NavBar from "./NavBar";
import { env } from "./Config";

function Cart() {
  const [item, setItem] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const response = await axios.get(`${env.api}/addcart/read`, {
        headers: {
          accesstoken: localStorage.getItem("token"),
        },
      });
      setItem(response);
    }

    getProducts();
  });

  return (
    <>
      <NavBar />
      <br />

      <section class=" h-custom" style={{ backgroundColor: "#eee" }}>
        <form>
          <div
            class="container-fluid"
            style={{
              width: "auto",
              height: "auto",
              margin: "0px",
              padding: "0px",
            }}
          >
            <div class="row d-flex justify-content-center align-items-center">
              <div class="col">
                <div class="card">
                  <div class="card-body p-4">
                    <div class="row">
                      <div class="col-lg-7">
                        <h5 class="mb-3">
                          <a href="/homepage" class="text-body">
                            <i class="fas fa-long-arrow-alt-left me-2"></i>
                            Continue shopping
                          </a>
                        </h5>
                        <hr />

                        <div class="d-flex justify-content-between align-items-center mb-4">
                          <div>
                            <p class="mb-1">{item._id}</p>
                            <p class="mb-0">You have items in your cart</p>
                          </div>
                          <div></div>
                        </div>

                        <div class="card mb-3">
                          <div class="card-body">
                            <div class="d-flex justify-content-between">
                              <div class="d-flex flex-row align-items-center">
                                <div>
                                  <img
                                    src={item.producturl}
                                    alt="images"
                                    style={{ width: "65px" }}
                                  />
                                </div>
                                <div class="ms-3">
                                  <p class="small mb-0">{item.productname}</p>
                                </div>
                              </div>
                              <div class="d-flex flex-row align-items-center">
                                <div style={{ width: "50px" }}>
                                  <h5 class="fw-normal mb-0">{}</h5>
                                </div>
                                <div style={{ width: "80px" }}>
                                  <h5 class="mb-0">{item.price}</h5>
                                </div>
                                <a href="#!" style={{ color: "#cecece" }}>
                                  <i class="fas fa-trash-alt"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-5">
                        <hr class="my-4" />

                        <div class="d-flex justify-content-between">
                          <p class="mb-2">Subtotal</p>
                          <p class="mb-2">{}</p>
                        </div>
                        <div class="d-flex justify-content-between mb-4">
                          <p class="mb-2">Total(Incl. taxes)</p>
                          <p class="mb-2">{}</p>
                        </div>

                        <button
                          type="button"
                          class="btn btn-info btn-block btn-lg"
                        >
                          <div class="d-flex justify-content-between">
                            <span>{}</span>
                            <span>
                              Checkout
                              <i class="fas fa-long-arrow-alt-right ms-2"></i>
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default Cart;
