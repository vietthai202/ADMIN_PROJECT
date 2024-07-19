import userService from 'services/UserService'
import orderService from 'services/OrderService';
import orderDetailService from 'services/OrderDetailService';
const currentDate = new Date();
const thirtyDaysAgo = new Date(currentDate);
thirtyDaysAgo.setDate(currentDate.getDate() - 15);
const dateList = [];
const dateIterator = new Date(thirtyDaysAgo);
while (dateIterator <= currentDate) {
	const day = dateIterator.getDate();
	const month = dateIterator.getMonth() + 1;
	const year = dateIterator.getFullYear();
	const formattedMonth = month < 10 ? `0${month}` : month;
	const formattedDay = day < 10 ? `0${day}` : day;
	const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
	dateList.push(formattedDate);
	dateIterator.setDate(dateIterator.getDate() + 1);
}

export const VisitorChartData = async () => {
	try {
		const [orderData, orderDetailsData] = await Promise.all([
			orderService.getAllOrder(1),
			orderDetailService.getAllOrderDetails()
		]);
		const orderDataResult = orderData;
		const orderDetailsResult = orderDetailsData;

		if (!orderDataResult || !Array.isArray(orderDataResult) || orderDataResult.length === 0) {
			console.log('No data available.');
			return [];
		}
		const today = new Date();
		orderDataResult.sort((a, b) => Math.abs(new Date(a.date) - today) - Math.abs(new Date(b.date) - today));
		orderDetailsResult.sort((a, b) => Math.abs(new Date(a.date) - today) - Math.abs(new Date(b.date) - today));

		const revenueData = (type) => {
			let orderDataRecord = [];
			let orderDetailDataRecord = [];
			if (type === 1) {
				orderDataRecord = orderDataResult.slice(0, 15);
			} else {
				orderDetailDataRecord = orderDetailsResult.slice(0, 15);
			}

			const dailyTotalAmounts = {};
			dateList.forEach(date => {
				dailyTotalAmounts[date] = 0;
			});
			orderDataRecord.forEach(record => {
				const dateKey = record.orderDate.substring(0, 10);
				dailyTotalAmounts[dateKey] += 1;
			});
			orderDetailDataRecord.forEach(record => {
				const dateKey = record.orderDate.substring(0, 10);
				dailyTotalAmounts[dateKey] += (record.price);
			});
			const seriesData = dateList.map(date => ({
				date: date,
				totalAmount: dailyTotalAmounts[date]
			}));
			const numericSeriesData = Array(dateList.length).fill(0);
			seriesData.forEach(entry => {
				const index = dateList.indexOf(entry.date);
				if (index !== -1) {
					numericSeriesData[index] = entry.totalAmount;
				}
			});
			return numericSeriesData;
		}
		return {
			series: [
				{
					name: "Doanh thu",
					data: revenueData(2)
				},
				{
					name: "Số đơn",
					data: revenueData(1)
				},
			],
			categories: dateList
		};
	} catch (error) {
		console.error("Error:", error);
		return [];
	}
};
const getAnnualStatisticData = async () => {
	try {
		const [orderData, userData, orderDat] = await Promise.all([
			orderService.getAllTransaction(),
			userService.getCountUser(),
			orderDetailService.getAllOrderDetails()
		]);
		const orderDataResult = orderData;
		const countUser = userData;
		const OrderDetail = orderDat;

		let totalPrice = 0;
		OrderDetail.map(order => {
			totalPrice += order.price;
		});

		const formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		});
		const formattedCountTransaction = formatter.format(totalPrice);
		return [
			{
				title: 'Tổng số thành viên',
				value: countUser,
				subtitle: ''
			},
			{
				title: 'Tổng số order',
				value: orderDataResult,
				subtitle: ''
			},
			{
				title: 'Doanh thu',
				value: formattedCountTransaction,
				subtitle: ''
			},
			// {
			// 	title: 'Tổng giao dịch',
			// 	value: countTransaction,
			// 	subtitle: ''
			// }
		];
	} catch (error) {
		console.error("Error:", error);
		return [];
	}
};

export const AnnualStatisticData = getAnnualStatisticData();