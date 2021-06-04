export const columns = [
	{
		title: "Module ID",
		width: 50,
		dataIndex: "ModuleID",
		key: "id",
	},
	{
		title: "Module Name",
		width: 50,
		dataIndex: "ModuleName",
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
		title: "Module Schema",
		dataIndex: "ModuleSchema",
		key: "2",
		width: 100,
	},
	{
		title: "Module Description",
		dataIndex: "Description",
		key: "Description",
		width: 100,
	},
	{
		title: "Active Status",
		key: "operation",
		dataIndex: "",
		fixed: "right",
		width: 50,
	},
];

export const data = [];
for (let i = 0; i < 20; i++) {
	data.push({
		key: i,
		ModuleID: `${i}`,
		ModuleName: `Module ${i}`,
		ModuleSchema: `Module Schema URL... ${i}`,
		status: i % 2 == 0 ? "Enabled" : "Disabled",
		isActive: i % 2 == 0 ? "true" : "false",
		Description: "This is a description section",
	});
}
