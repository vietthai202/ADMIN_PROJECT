import { Button, Table, Tag, message, Card, Modal, Input } from "antd";
import { EditOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import formatDate from 'views/app-views/formatDate'
import { useNavigate } from "react-router-dom";
import utils from "utils";
import orderService from "services/OrderService";
import orderDetailService from "services/OrderDetailService";
import productService from "services/ProductService";
import userService from "services/UserService";
import '../../../../index.css'

export const OrderManagement = () => {
    const navigate = useNavigate();
    const format = formatDate;
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [listOrder, setListOrder] = useState([]);
    const [orderData, setOrderData] = useState();
    const [afterUpdate, setAfterUpdate] = useState(true);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [type, setType] = useState('');

    const buttonDelete = async (data) => {
        setIsDeleteOpen(true);
        try {
            const [orderData, productData] = await Promise.all([
                orderDetailService.getOrderDetailByOrder(data.id),
                productService.getAllProduct()
            ]);
            const order = orderData;
            const productList = productData;
            const categoryMap = new Map(productList.map(product => [product.id, product.name]));
            const updatedOrderList = order.map(order => ({
                ...order,
                productName: categoryMap.get(order.productId) || ""
            }));
            setListOrder(updatedOrderList);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const cancelDelete = () => {
        setIsDeleteOpen(false);
    }

    const doUpdate = () => {
        if (orderData) {
            confirmUpdate(orderData.id, type, inputValue)
        }
    }

    const confirmUpdate = async (id, type, comment) => {
        if (type === 'confirm') {
            const orderUpdate = orderData;
            orderUpdate.id = id;
            orderUpdate.status = 1;
            await orderService.UpdateOrder(orderUpdate)
                .then(() => {
                    message.success('Thành công');
                    setAfterUpdate(!afterUpdate);
                    navigate(`/app/functions/order-managements`);
                })
                .catch((error) => {
                    message.error('Xảy ra lỗi', error);
                })
        } else {
            const orderUpdate = orderData;
            orderUpdate.id = id;
            orderUpdate.status = 2;
            orderUpdate.comment = comment;
            await orderService.UpdateOrder(orderUpdate)
                .then(() => {
                    message.success('Thành công');
                    setAfterUpdate(!afterUpdate);
                    navigate(`/app/functions/order-managements`);
                })
                .catch((error) => {
                    message.error('Xảy ra lỗi', error);
                })
        }
        setIsUpdateOpen(false);
    }

    const openUpdate = (data, type) => {
        setIsUpdateOpen(true);
        setOrderData(data);
        setType(type);
    }

    const closeUpdate = () => {
        setIsUpdateOpen(false);
    }

    const getStatus = status => {
        switch (status) {
            case 1:
                return 'green';
            case 2:
                return 'red';
            default:
                return 'yellow';
        }
    };

    const tableColumns = [
        {
            title: "Mã đơn hàng",
            dataIndex: "id",
            sorter: (a, b) => utils.antdTableSorter(a, b, "id"),
            render: (text) => `#${text}`,
        },
        {
            title: "Khách hàng",
            dataIndex: "userName",
            sorter: (a, b) => utils.antdTableSorter(a, b, "userId"),
        },
        {
            title: "Địa chỉ nhận hàng",
            dataIndex: "shipAddress",
            sorter: (a, b) => utils.antdTableSorter(a, b, "shipAddress"),
        },
        {
            title: "Phương thức thanh toán",
            dataIndex: "payment",
            sorter: (a, b) => utils.antdTableSorter(a, b, "payment"),
        },
        {
            title: "Ngày order",
            dataIndex: "orderDate",
            sorter: (a, b) => utils.antdTableSorter(a, b, "orderDate"),
            render: orderDate => format(orderDate)
        },
        {
            title: "Trạng thái đơn",
            dataIndex: "status",
            sorter: (a, b) => utils.antdTableSorter(a, b, "status"),
            render: (_, elm) => (
                <><Tag color={getStatus(elm.status)}>{elm.status === 0 ? 'Chờ xử lý' : 'Không xác định'}</Tag></>
            ),
        },
        {
            title: "Hành động",
            dataIndex: "actions",
            render: (_, record) => (
                <div>
                    <Button classNames="mt-2" danger onClick={() => buttonDelete(record)}>
                        Thông tin
                    </Button>
                    <Button className="mt-2 ml-2" icon={<EditOutlined />} type="primary" onClick={(() => openUpdate(record, 'confirm'))} >Hoàn thành</Button>
                    <Button className="mt-2 ml-2" danger type="primary" onClick={(() => openUpdate(record, 'refuse'))} >Từ chối</Button>
                </div>
            ),
        },
    ];

    const fetchData = async () => {
        setLoading(true);
        try {
            const [orderData, userData] = await Promise.all([
                orderService.getAllOrder(0),
                userService.getAllUser()
            ]);
            const order = orderData;
            const user = userData;
            const userMap = new Map(user.map(user => [user.id, user.firstName + ' ' + user.lastName]));
            const updatedOrderList = order.map(order => ({
                ...order,
                userName: userMap.get(order.userId) || "Unknown"
            }));
            setList(updatedOrderList);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [afterUpdate]);

    return (
        <Card>

            <div className="table-responsive">
                <Table
                    columns={tableColumns}
                    dataSource={list}
                    loading={loading}

                />

                <Modal
                    okButtonProps={{ style: { backgroundColor: '#CD1818' } }}
                    title="Thông tin đơn hàng"
                    open={isDeleteOpen}
                    onCancel={cancelDelete}
                >
                    <Table
                        columns={[
                            {
                                title: "Tên sản phẩm",
                                dataIndex: "productName",
                            },
                            {
                                title: "Số lượng",
                                dataIndex: "quantity",
                            },
                            {
                                title: "Tổng tiền",
                                dataIndex: "price",
                            },
                        ]}
                        dataSource={listOrder}
                        loading={loading}
                    />

                </Modal>

                <Modal
                    okButtonProps={{ style: { backgroundColor: '#CD1818' } }}
                    title={type === 'confirm' ? 'Chấp nhận đơn hàng' : 'Từ chối đơn hàng'}
                    open={isUpdateOpen}
                    onOk={doUpdate}
                    onCancel={closeUpdate}
                    okText="Xác nhận"
                    cancelText="Hủy"
                >
                    <div className='flex flex-col items-center'>
                        {type === 'confirm' ? 'Bạn có chắc chắn xác nhận hoàn thành đơn hàng!' : 'Bạn có chắc chắn muốn từ chối đơn hàng!'}
                        {type !== 'confirm' && (
                            <Input
                                type='text'
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder='Nhập lý do từ chối'
                                className='mt-2 p-2 border rounded'
                            />
                        )}
                    </div>

                </Modal>
            </div>
        </Card>
    )
}


export default OrderManagement;