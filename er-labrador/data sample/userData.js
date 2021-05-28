export const columns = [
	{
		title: "User ID",
		width: 100,
		dataIndex: "UserID",
		key: "userID",
		fixed: "left",
	},
	{
		title: "Name",
		width: 100,
		dataIndex: "Name",
		key: "name",
		fixed: "left",
	},
	{
		title: "Eratos User ID",
		width: 100,
		dataIndex: "EratosUserID",
		key: "eratosID",
		fixed: "left",
	},
	{
		title: "Email",
		dataIndex: "Email",
		key: "7",
		width: 150,
	},
	{
		title: "Auth0 ID",
		dataIndex: "Auth0ID",
		key: "2",
		width: 150,
	},
	{
		title: "Date and Time of User Created",
		dataIndex: "CreatedAt",
		key: "3",
		width: 150,
	},
	{
		title: "Info",
		dataIndex: "Info",
		width: 150,
	},
	{
		title: "Administrator",
		dataIndex: "isAdmin",
		key: "4",
		width: 150,
	},
];
var date = new Date();
export const data = [];
for (let i = 0; i < 100; i++) {
	data.push({
		key: i,
		UserID: `000${i}`,
		Name: `Edward ${i}`,
		EratosUserID: `000${i}`,
		Auth0ID: `000${i}`,
		CreatedAt: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} 
        ${date.getHours()}:${date.getUTCMinutes()}:${date.getSeconds()}`,
		Email: `edwardid${i}@gmail.com`,
		isAdmin: i == 0 || i == 1 ? "Yes" : "No",
		Info: "This is the info section which may contain the description of the user",
	});
}
