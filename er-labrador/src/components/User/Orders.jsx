import "../../styles/Orders.css";
import React from "react";
import PubSub from "pubsub-js";
import { Link } from "react-router-dom";

import { Button, Table, Layout } from "antd";
import { HomeFilled } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

class BasicTable extends React.Component {
	state = {
		userUri: "https://staging.e-pn.io/users/xsrudeulfvtr2eiaiksic2jf",
		task: [],
	};

	async componentDidMount() {
		PubSub.subscribe("getUserId", (data) => {
			console.log("User Uri is: " + data);
			this.setState({
				userUri: data,
			});
		});

		let url =
			"https://eratosuombackend.azurewebsites.net/api/getTasksOrdersOfUser?userUri=" +
			this.state.userUri +
			" &code=pC04Se3EKKG7Is6PPO3az2Idtzg6gJEFrTVbvpOIKh0JXfd9itviGQ==";

		try {
			const response = await fetch(url, {
				method: "GET",
			})
				.then((resp) => resp.json())
				.catch((error) => {
					console.log(error);
				});
			var allTasks = response.Tasks;
			console.log(response);
			for (let i in allTasks) {
				this.setState({ task: [...this.state.task, allTasks[i]] });
			}
		} catch (error) {
			console.log("request is failed", error);
		}
	}

	render() {
		//定义表头，一般放在render()中
		const columns = [
			{
				title: "Order ID",
				dataIndex: "OrderID",
			},
			{
				title: "Result",
				dataIndex: "Meta",
			},
			{
				title: "Type",
				dataIndex: "Type",
			},
			{
				title: "Ctreation Time",
				dataIndex: "CreatedAt",
			},
		];

		return (
			<Layout className="layout">
				<Header>
					<div className="logo" />
					<Link to="/home">
						<Button
							type="primary"
							shape="circle"
							size="large"
							icon={<HomeFilled />}
						></Button>
					</Link>
				</Header>
				<Content style={{ padding: "0 50px" }}>
					<div className="site-layout-content">
						<Table
							columns={columns}
							dataSource={this.state.task}
							pagination={false}
							bordered
						></Table>
					</div>
				</Content>
				<Footer style={{ textAlign: "center" }}>
					Data Analysis Retrieved by Eratos
				</Footer>
			</Layout>
		);
	}
}

export default BasicTable;
