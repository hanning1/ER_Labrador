export const columns = [
	{
		title: "Module ID",
		width: 50,
		dataIndex: "id",
		key: "id",
	},
	{
		title: "Module Name",
		width: 50,
		dataIndex: "name",
		key: "name",
		// fixed: "left",
	},
	{
		title: "Status",
		dataIndex: "status",
		key: "1",
		width: 50,
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "2",
		width: 100,
	},
	{
		title: "Status",
		key: "operation",
		dataIndex: "",
		fixed: "right",
		width: 50,
	},
];

export const data = [];
for (let i = 0; i < 100; i++) {
	data.push({
		key: i,
		id: `0000${i}`,
		name: `Module ${i}`,
		status: i % 2 == 0 ? "Enabled" : "Disabled",
		address: `London Park no. ${i}`,
		email: `edwardid${i}@gmail.com`,
	});
}
