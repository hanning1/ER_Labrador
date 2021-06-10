import React, { Component } from "react";
import PubSub from "pubsub-js";
import { Link } from "react-router-dom";
import "../../styles/Result.css";

import { Button, Descriptions, Badge, Layout } from "antd";
import { HomeFilled } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

export default class Result extends Component {
	state = {
		processState: "",
		taskID: 10,
		userUri: "https://staging.e-pn.io/users/xsrudeulfvtr2eiaiksic2jf",
		dataSource: [],
		task: [],
	};

	async componentDidMount() {
		PubSub.subscribe("getTaskId", (data) => {
			console.log("Task get: " + data);
			this.setState({
				taskID: data,
			});
		});

		PubSub.subscribe("getUserId", (data) => {
			console.log("User Uri is: " + data);
			this.setState({
				userUri: data,
			});
		});

		//userUri=https://staging.e-pn.io/users/xsrudeulfvtr2eiaiksic2jf
		var url =
			"https://eratosuombackend.azurewebsites.net/api/getTasksOrdersOfUser?userUri=" +
			this.state.userUri +
			"&code=pC04Se3EKKG7Is6PPO3az2Idtzg6gJEFrTVbvpOIKh0JXfd9itviGQ==";
		try {
			const response = await fetch(url, {
				method: "GET",
				headers: new Headers({
					"Content-Type": "application/json",
				}),
			})
				.then((resp) => resp.json())
				.catch((error) => {
					console.log(error);
				});
			console.log(response);
			var allTasks = response.Tasks;
			console.log(allTasks);
			for (let i in allTasks) {
				if (allTasks[i].TaskID == this.state.taskID) {
					this.setState({ task: [allTasks[i]] });
					break;
				}
			}
		} catch (error) {
			console.log("request is failed", error);
		}
	}

	// CreatedAt: "6/4/2021 6:48:18 AM"
	// EndedAt: null
	// EratosTaskID: "rgfeoi7kwz4butnvm6qf5r5b"
	// Error: null
	// LastUpdatedAt: "6/4/2021 6:48:18 AM"
	// Meta: "https://staging.e-pn.io/resources/p7vn2z6j5y44hqu5f4c22ddo"
	// Name: "eratos"
	// OrderID: 7
	// Priority: "Low"
	// StartedAt: null
	// State: "Queued"
	// TaskID: 10
	// Type: "GenerateClimateInfo"
	// UserID: 5

	render() {
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
						{this.state.task.map((item) => (
							<Descriptions
								title="View Result"
								layout="vertical"
								bordered
							>
								<Descriptions.Item label="User Name">
									{item.Name}
								</Descriptions.Item>
								<Descriptions.Item label="Data Type">
									{item.Type}
								</Descriptions.Item>
								<Descriptions.Item label="Status">
									{"Complete" === item.State ? (
										<Badge
											status="success"
											text="Completed"
										/>
									) : (
										<Badge
											status="processing"
											text="Processing"
										/>
									)}
								</Descriptions.Item>
								<Descriptions.Item label="Priority">
									{item.Priority}
								</Descriptions.Item>
								<Descriptions.Item
									label="Eratos Resourse ID"
									span={2}
								>
									{item.EratosTaskID}
								</Descriptions.Item>
								<Descriptions.Item label="Result Link" span={3}>
									<div
										dangerouslySetInnerHTML={{
											__html: item.Meta,
										}}
									/>
								</Descriptions.Item>
							</Descriptions>
						))}

						<Button type="primary">
							<Link to="/home">Search Again</Link>
						</Button>
						<Button type="primary" style={{ float: "right" }}>
							<Link to="/history">History Orders</Link>
						</Button>
					</div>
				</Content>
				<Footer style={{ textAlign: "center" }}>
					Data Analysis Retrieved by Eratos
				</Footer>
			</Layout>
		);
	}
}
