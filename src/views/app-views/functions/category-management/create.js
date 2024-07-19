import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Card, Form, message, Button } from 'antd';
import categoryService from 'services/CategoryService';
import { useNavigate } from 'react-router-dom';

const rules = {
    name: [
        {
            required: true,
            message: 'Vui lòng nhập tên danh mục',
        }
    ],
    description: [
        {
            required: true,
            message: 'Vui lòng nhập mô tả danh mục',
        }
    ]
}
const AddCategory = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        categoryName: '',
        description: '',
    });

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (event) => {
        fetchData();
        setFormData({
            categoryName: '',
            description: '',
        });
    };


    const fetchData = async () => {
        try {
            await categoryService.createCategory(formData);
            message.success('Thêm danh mục thành công');
            navigate(`/app/functions/category-management/`)
        } catch (error) {
            message.error('Thêm danh mục thất bại', error)
        }
    };

    useEffect(() => {
        
    }, []);
    return (
        <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
                <Card title="Thông tin cơ bản">
                    <Form onFinish={handleSubmit}>
                        <Form.Item label="Tên danh mục" name="categoryName" rules={rules.name}>
                            <Input placeholder="Tên danh mục" value={formData.name} onChange={e => handleChange('categoryName', e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Mô tả" name="description" rules={rules.description}>
                            <Input.TextArea rows={4} placeholder="Mô tả" value={formData.description} onChange={e => handleChange('description', e.target.value)} />
                        </Form.Item>

                        <Button type="primary" htmlType="submit">Tạo danh mục</Button>
                    </Form>
                </Card>

            </Col>
        </Row>
    )
}

export default AddCategory
