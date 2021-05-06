export const columns = [
	{
		title: "Order ID",
		width: 30,
		dataIndex: "id",
		key: "id",
	},
	{
		title: "Order Name",
		width: 30,
		dataIndex: "name",
		key: "name",
		// fixed: "left",
	},
	{
		title: "Status",
		dataIndex: "status",
		key: "1",
		width: 25,
	},
	{
		title: "Updated at",
		dataIndex: "updatedAt",
		key: "2",
		width: 80,
	},
	{
		title: "Actions",
		key: "operation",
		dataIndex: "",
		fixed: "right",
		width: 30,
	},
];
var date = new Date();
export const data = [];
for (let i = 0; i < 100; i++) {
	data.push({
		key: i,
		id: `0000${i}`,
		name: `Order ${i}`,
		status: i % 2 == 0 ? "Pending" : "Ongoing",
		address: `London Park no. ${i}`,
		updatedAt: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} 
        ${date.getHours()}:${date.getUTCMinutes()}:${date.getSeconds()}`,
	});
}
