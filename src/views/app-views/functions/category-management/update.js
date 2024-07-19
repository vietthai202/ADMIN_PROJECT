import React, { useState } from 'react';
import { Input, Row, Col, Card, Form, message, Button } from 'antd';
import categoryService from 'services/CategoryService';
import { useNavigate, useLocation } from 'react-router-dom';
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
    ],
}
const UpdateCategory = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const categoryData = location.state.categoryData;
    const title = "Chỉnh sửa danh mục: " + categoryData?.categoryName
    const [formData, setFormData] = useState({
        id: categoryData?.id,
        categoryName: categoryData?.categoryName,
        description: categoryData?.description,
  
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
        navigate(`/app/functions/category-management/`)
    };
    const fetchData = async () => {
        try {
            await categoryService.updateCategory(formData);
            message.success('Cập nhật danh mục thành công')
        } catch (error) {
            message.error('Cập nhật danh mục thất bại', error)
        }
    };
    return (
        <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
                <Card title={title}>
                    <Form onFinish={handleSubmit}>
                        <Form.Item label="Tên danh mục" name="name" rules={rules.name} initialValue={formData.categoryName} >
                            <Input placeholder="Tên danh mục" onChange={e => handleChange('categoryName', e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Mô tả" rules={rules.description} name="description" initialValue={formData.description} >
                            <Input.TextArea rows={4} placeholder="Mô tả" value={formData.description} onChange={e => handleChange('description', e.target.value)} />
                        </Form.Item>
                        
                        <Button type="primary" htmlType="submit" >Cập nhật danh mục</Button>
                    </Form>
                </Card>

            </Col>
        </Row>
    )
}

export default UpdateCategory
