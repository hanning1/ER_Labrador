export const columns = [
	{
		title: "Order ID",
		width: 30,
		dataIndex: "OrderID",
		key: "id",
	},
	{
		title: "User ID",
		width: 30,
		dataIndex: "UserID",
		key: "userID",
		// fixed: "left",
	},
	{
		title: "Price",
		width: 30,
		dataIndex: "Price",
		key: "price",
		// fixed: "left",
	},
	{
		title: "Payment ID",
		width: 30,
		dataIndex: "PaymentID",
		key: "paymentID",
		// fixed: "left",
	},
	{
		title: "Status",
		dataIndex: "status",
		key: "1",
		width: 25,
	},
	{
		title: "Time of Order Placed",
		dataIndex: "updatedAt",
		key: "2",
		width: 80,
	},
	
];
var date = new Date();
export const data = [];
for (let i = 0; i < 100; i++) {
	data.push({
		key: i,
		OrderID: `000${i}`,
		UserID: `000${i}`,
		Price: 3*(100-i),
		status: i % 2 == 0 ? "Pending" : "Ongoing",
		PaymentID: `0000000${i}`,
		updatedAt: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} 
        ${date.getHours()}:${date.getUTCMinutes()}:${date.getSeconds()}`,
	});
}
