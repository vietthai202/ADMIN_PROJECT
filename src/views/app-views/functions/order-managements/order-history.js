import { Button, Table, Tag, Card, Modal, Space, Input, message  } from "antd";
import { useEffect, useState } from "react";
import { SearchOutlined, FileExcelOutlined } from '@ant-design/icons';
import formatDate from 'views/app-views/formatDate'
import utils from "utils";
import orderService from "services/OrderService";
import orderDetailService from "services/OrderDetailService";
import productService from "services/ProductService";
import userService from "services/UserService";

const USER_WITHDRAWAL = [
    {
        value: 0,
        label: 'Đang vận chuyển',
    },
    {
        value: 1,
        label: 'Hoàn thành',
    },
    {
        value: 2,
        label: 'Đã hủy',
    },
]

export const VipManagement = () => {
    const format = formatDate;
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [listOrder, setListOrder] = useState([]);
    const [isOpenInfo, setIsOpenInfo] = useState(false);

    const onOpenInfo = async (id) => {
        setIsOpenInfo(true);
        try {
            const [orderData, productData] = await Promise.all([
                orderDetailService.getOrderDetailByOrder(id),
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

    const closeModalInfo = () => {
        setIsOpenInfo(false);
    }

    const renderStatus = (statusValue) => {
        const status = USER_WITHDRAWAL.find(item => item.value === statusValue);
        let color = 'yellow';
        if (status && status.value === 2) {
            color = 'volcano';
        } else if (status.value === 1) {
            color = 'green';
        }
        return (
            <Tag color={color} key={statusValue}>
                {status ? status.label : 'Chưa biết'}
            </Tag>
        );
    };

    const exportReport = async() => {
        await orderService.exportReport()
        .then((data) => {
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'orders.xlsx'); // Tên tệp khi tải xuống
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            message.success('Thành công');
        })
        .catch((error) => {
            message.error('Thất bại');
        })
    }

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
            sorter: (a, b) => utils.antdTableSorter(a, b, "userName"),
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
            title: "Ngày nhận",
            dataIndex: "shippedDate",
            sorter: (a, b) => utils.antdTableSorter(a, b, "shippedDate"),
            render: shippedDate => format(shippedDate)
        },
        {
            title: "Trạng thái đơn",
            dataIndex: "status",
            sorter: (a, b) => utils.antdTableSorter(a, b, "status"),
            render: renderStatus
        },
        {
            title: "Lý do hủy đơn",
            dataIndex: "comment",
            sorter: (a, b) => utils.antdTableSorter(a, b, "comment"),
        },
        {
            title: "Hành động",
            dataIndex: "actions",
            render: (_, record) => (
                <div>
                    <Button classNames="mt-2" danger onClick={() => onOpenInfo(record.id)}>
                        Thông tin
                    </Button>
                </div>
            ),
        },
    ];

    const fetchData = async () => {
        setLoading(true);
        try {
            const [orderData, userData] = await Promise.all([
                orderService.getAllOrder(),
                userService.getAllUser()
            ]);
            const order = orderData;
            const user = userData;
            const userMap = new Map(user.map(user => [user.id, user.lastName]));
            const updatedOrderList = order.map(order => ({
                ...order,
                userName: userMap.get(order.userId) || ""
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
    }, []);

    return (
        <Card>
            <Space alignItems="center" justifyContent="space-between" className="wrap" mobileFlex={false}>
                <Space className="mb-1" mobileFlex={false}>
                    <div className="mr-md-3 mb-3">
                        <Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => (e)} />
                    </div>
                </Space>
                <div className="">
                    <Button onClick={ exportReport} className="blue-button" icon={<FileExcelOutlined />} block>Xuất báo cáo</Button>
                </div>
            </Space>
            <div className="table-responsive">
                <Table
                    columns={tableColumns}
                    dataSource={list}
                    loading={loading}
                />

                <Modal
                    okButtonProps={{ style: { backgroundColor: '#CD1818' } }}
                    title="Thông tin đơn hàng"
                    open={isOpenInfo}
                    onCancel={closeModalInfo}
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
                        rowKey='id'
                    />
                </Modal>
            </div>
        </Card>
    )
}


export default VipManagement;