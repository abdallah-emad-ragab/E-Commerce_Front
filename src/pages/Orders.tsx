import { Heading } from "../components/common";
import { Loading } from "../components/feedback";
import useOrders from "../hooks/useOrders";

function Orders() {
    const { loading, error, orderList, showModal, selectedProduct, viewDetailsHandler, closeModalHandler, setShowModal } = useOrders();

    console.log(selectedProduct.map((el) => el.cat_prefix || "no prefix"));
    return (
        <>
            <Heading title="My Orders" />
            <br />

            {/* Modal */}
            {showModal && (
                <div className="modal show d-block" tabIndex={-1} onClick={() => setShowModal(false)}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Product Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModalHandler}></button>
                            </div>
                            <div className="modal-body">
                                {selectedProduct.map((el) => (
                                    <div key={el.id} className="d-flex align-items-center mb-3">
                                        <img src={el.img} alt={el.title} style={{ width: "80px", height: "80px", objectFit: "cover", marginRight: "15px" }} />
                                        <div>
                                            <h5>{el.title}</h5>
                                            <p>${el.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Table */}
            <Loading status={loading} error={error || ""} type="category">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Order Number</th>
                        <th scope="col">Items</th>
                        <th scope="col">Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList.map((order) => (
                        <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{order.items.length} item(s) {" "}
                                <button className="btn btn-outline-secondary p-1" onClick={() =>viewDetailsHandler(order.id)}>Product(s) Details</button>
                            </td>
                            <td>${order.subtotal.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </Loading>
        </>
    )
}

export default Orders;