import axios from "axios";
import {Order, OrderData, Product} from "../components/interfaces";

const ORDERS_BASE_URL = 'http://localhost:5001';
const PRODUCTS_BASE_URL = 'http://localhost:5002';

const INPIPELINE_URL = ORDERS_BASE_URL + '/api/orders/inpipeline';

const getInPipelineData = async () => {
    const orderData: OrderData = {
        Queued: [],
        InProgress: [],
        QA: [],
    };
    let errorOccured = false;
    try {
        const response = await axios.get(INPIPELINE_URL);
        if (response?.status === 200) {
            const {data} = response.data;
            data.forEach((order: Order) => {
                orderData[order.OrderStatus as keyof OrderData].push(order);
            });
        } else {
            const {message} = response.data;
            throw message;
        }
    } catch (err) {
        console.error(err);
        errorOccured = true;
    }
    return {orderData, errorOccured};
};

const UPDATE_STATUS_URL = ORDERS_BASE_URL + '/api/orders/update_status';

const updateOrderStatus = async (order: Order, newOrderStatus: string) => {
    const updatedOrder = {...order, OrderStatus: newOrderStatus};
    let orderStatusUpdated = false;
    try {
        const response = await axios.post(UPDATE_STATUS_URL, updatedOrder);
        if (response?.status === 200) orderStatusUpdated = true;
        else {
            const {message} = response.data;
            throw message;
        }
    } catch (err) {
        console.error(err);
    }
    return orderStatusUpdated;
};

const PRODUCTS_URL = PRODUCTS_BASE_URL + '/api/products';

const fetchProducts = async () => {
    const products: Product[] = [];
    let errorOccured = false;
    try {
        const response = await axios.get(PRODUCTS_URL);
        if (response?.status === 200) {
            const {data} = response.data;
            data.forEach((product: Product) => {
                products.push(product);
            });
        } else {
            const {message} = response.data;
            throw message;
        }
    } catch (err) {
        console.error(err);
        errorOccured = true;
    }
    return {products, errorOccured};
};

export {getInPipelineData, INPIPELINE_URL, updateOrderStatus, UPDATE_STATUS_URL, fetchProducts, PRODUCTS_URL};