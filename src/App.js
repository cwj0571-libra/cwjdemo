import React from "react";
import { oneMoreData, twoMoreData, threeMoreData } from "./dataSource";
import ReactEchart from "echarts-for-react";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			oneOption: {},
		};
	}
	componentDidMount() {}
	initOneData(dataSource) {
		let nodesData = [];
		let linesData = [];
		let otherArr = [];
		let xstep = 50;
		let ystep = -(xstep / 10) * (dataSource.length - 1);
		dataSource.map((item, index) => {
			const { name, imageData } = item;
			if (index) {
				//保存子节点
				otherArr.push(item);
			} else {
				//主节点
				nodesData.push({
					name,
					x: 0,
					y: 0,
					symbol: "image://" + imageData,
				});
			}
		});

		if (otherArr.length) {
			let sum = 0;
			otherArr.map((item) => {
				item.x = sum += xstep;
				nodesData.push({
					name: item.name,
					x: item.x,
					y: 0,
					symbol: "image://" + item.imageData,
				});
			});
			//存在子集
			let isBoth = otherArr.length % 2 == 0;
			if (isBoth) {
				//数组双数
				if (otherArr.length / 2 === 1) {
					//二个子集
					let middleX = (otherArr[0].x + otherArr[1].x) / 2;
					nodesData[0].x = middleX;
				} else {
					let maxIndex = otherArr.length / 2 - 1;
					let minIndex = maxIndex - 1;
					let middleX = (otherArr[maxIndex].x + otherArr[minIndex].x) / 2;
					nodesData[0].x = middleX + xstep;
				}
			} else {
				//单数
				let maxIndex = Math.floor(otherArr.length / 2);
				nodesData[0].x = otherArr[maxIndex].x;
			}
			nodesData[0].y = ystep;
			nodesData.map((item) => {
				linesData.push({
					source: nodesData[0].name,
					target: item.name,
				});
			});
		}
		let zoom = 1;
		let nodeLength = nodesData.length;
		if (nodeLength < 4) {
			zoom = 0.7;
		}
		let oneOption = {
			series: [
				{
					type: "graph",
					symbolSize: 40,
					zoom,
					data: nodesData,
					label: {
						show: true,
						position: "bottom",
					},
					links: linesData,
				},
			],
		};
		return oneOption;
	}
	initMoreData(dataSource) {
		let nodesData = [];
		let linesData = [];
		let mainArr = [];
		let otherArr = [];
		let ystep = 20;
		dataSource.map((item, index) => {
			const { name, imageData } = item;
			if (!index) {
				//主节点
				nodesData.push({
					name,
					x: 0,
					y: 0,
					symbol: "image://" + imageData,
				});
			} else if (item.type === "minor") {
				//主节点分支
				mainArr.push(item);
			} else {
				//分节点三级分支
				otherArr.push(item);
			}
		});
		if (mainArr.length) {
			//分节点
			mainArr.map((item, index) => {
				nodesData.push({
					name: item.name,
					x: index ? 50 : -50,
					y: 0,
					symbol: "image://" + item.imageData,
				});
			});

			nodesData.map((item) => {
				linesData.push({
					source: nodesData[0].name,
					target: item.name,
				});
			});
		}
		if (otherArr.length) {
			//三级节点
			console.log(nodesData);
			let letSum = -20;
			let rightSum = -20;
			otherArr.map((item) => {
				if (item.sourceData === "bond0") {
					item.y = letSum += ystep;
					nodesData.push({
						name: item.name,
						x: -100,
						y: item.y,
						symbol: "image://" + item.imageData,
					});
				} else {
					item.y = rightSum += ystep;
					nodesData.push({
						name: item.name,
						x: 100,
						y: item.y,
						symbol: "image://" + item.imageData,
					});
				}
			});
		}
		let oneOption = {
			series: [
				{
					type: "graph",
					symbolSize: 40,
					zoom: 1,
					label: {
						show: true,
						position: "bottom",
					},
					data: nodesData,
					links: linesData,
				},
			],
		};
		return oneOption;
	}
	initTiledData(dataSource) {
		let nodesData = [];
		let linesData = [];
		let otherArr = [];
		dataSource.map((item, index) => {
			const { name, imageData } = item;
			if (index) {
				//保存子节点
				otherArr.push(item);
			} else {
				//主节点
				nodesData.push({
					name,
					x: 0,
					y: 0,
					symbol: "image://" + imageData,
				});
			}
		});

		if (otherArr.length) {
			otherArr.map((item, index) => {
				nodesData.push({
					name: item.name,
					x: index ? 50 : -50,
					y: 0,
					symbol: "image://" + item.imageData,
				});
			});

			nodesData.map((item) => {
				linesData.push({
					source: nodesData[0].name,
					target: item.name,
				});
			});
		}
		let oneOption = {
			series: [
				{
					type: "graph",
					symbolSize: 40,
					zoom: 1,
					label: {
						show: true,
						position: "bottom",
					},
					data: nodesData,
					links: linesData,
				},
			],
		};
		return oneOption;
	}

	render() {
		const oneOption = this.initOneData(oneMoreData);
		const twoOption = this.initTiledData(twoMoreData);
		const threeOption = this.initMoreData(threeMoreData);
		return (
			<div>
				<h3>一对多类</h3>
				<div style={{ height: 160, width: "50%" }}>
					<ReactEchart style={{ height: "100%" }} option={oneOption} />
				</div>
				<h3>平铺</h3>
				<div style={{ height: 160, width: "50%" }}>
					<ReactEchart style={{ height: "100%" }} option={twoOption} />
				</div>
				<h3>平铺一对多</h3>
				<div style={{ height: 200, width: "50%" }}>
					<ReactEchart style={{ height: "100%" }} option={threeOption} />
				</div>
			</div>
		);
	}
}
export default App;
