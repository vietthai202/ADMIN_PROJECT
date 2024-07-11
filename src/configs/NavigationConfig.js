import { DashboardOutlined, ShoppingCartOutlined, UsergroupAddOutlined, AppstoreAddOutlined, HistoryOutlined, FileImageOutlined } from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const userRole = localStorage.getItem("role") || "";

const dashBoardNavTree = (ROLE) => {
  switch (ROLE) {
    case '2':
      return [{
        key: 'dashboards',
        path: `${APP_PREFIX_PATH}/dashboards`,
        title: 'Dashboard',
        icon: DashboardOutlined,
        breadcrumb: false,
        isGroupTitle: true,
        submenu: [
          {
            key: 'dashboards',
            path: `${APP_PREFIX_PATH}/dashboards`,
            title: 'Dashboard',
            icon: DashboardOutlined,
            breadcrumb: false,
            submenu: []
          }
        ]
      },
      {
        key: 'statistical',
        path: `${APP_PREFIX_PATH}/statistical`,
        title: 'Thống kê',
        icon: DashboardOutlined,
        breadcrumb: false,
        isGroupTitle: true,
        submenu: [
          {
            key: 'functions-order-managements',
            path: `${APP_PREFIX_PATH}/functions/order-managements`,
            title: 'Lịch sử Order',
            icon: ShoppingCartOutlined,
            breadcrumb: false,
            submenu: []
          },
          {
            key: 'functions-order-history',
            path: `${APP_PREFIX_PATH}/functions/order-managements/order-history`,
            title: 'Đơn đã hoàn thành',
            icon: HistoryOutlined,
            breadcrumb: false,
            submenu: []
          },
        ]
      },
      {
        key: 'functions',
        path: `${APP_PREFIX_PATH}/functions`,
        title: 'Chức năng',
        icon: DashboardOutlined,
        breadcrumb: false,
        isGroupTitle: true,
        submenu: [
          {
            key: 'functions-category-management',
            path: `${APP_PREFIX_PATH}/functions/category-management`,
            title: 'Danh mục sản phẩm',
            icon: AppstoreAddOutlined,
            breadcrumb: false,
            submenu: []
          },
          {
            key: 'functions-product-management',
            path: `${APP_PREFIX_PATH}/functions/product-management`,
            title: 'Quản lý sản phẩm',
            icon: AppstoreAddOutlined,
            breadcrumb: false,
            submenu: []
          },
          {
            key: 'functions-user-management',
            path: `${APP_PREFIX_PATH}/functions/user-management`,
            title: 'Quản lý thành viên',
            icon: UsergroupAddOutlined,
            breadcrumb: false,
            submenu: []
          },
        ]
      }
      ]
    case '3':
      return [
        {
          key: 'dashboards',
          path: `${APP_PREFIX_PATH}/dashboards`,
          title: 'Dashboard',
          icon: DashboardOutlined,
          breadcrumb: false,
          isGroupTitle: true,
          submenu: [
            {
              key: 'dashboards',
              path: `${APP_PREFIX_PATH}/dashboards`,
              title: 'Dashboard',
              icon: DashboardOutlined,
              breadcrumb: false,
              submenu: []
            }
          ]
        },
        {
          key: 'statistical',
          path: `${APP_PREFIX_PATH}/statistical`,
          title: 'Thống kê',
          icon: DashboardOutlined,
          breadcrumb: false,
          isGroupTitle: true,
          submenu: [
            {
              key: 'functions-order-managements',
              path: `${APP_PREFIX_PATH}/functions/order-managements`,
              title: 'Lịch sử Order',
              icon: ShoppingCartOutlined,
              breadcrumb: false,
              submenu: []
            },
            {
              key: 'functions-order-history',
              path: `${APP_PREFIX_PATH}/functions/order-managements/order-history`,
              title: 'Đơn đã hoàn thành',
              icon: HistoryOutlined,
              breadcrumb: false,
              submenu: []
            },
          ]
        },
      ]
  }
}

const navigationConfig = [
  ...dashBoardNavTree(userRole)
]

export default navigationConfig;
