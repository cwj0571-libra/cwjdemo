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
		let ystep = -(xstep / 10) * ((dataSource.children && dataSource.children.length) || 0);
		const { name, imageData } = dataSource;
		nodesData.push({
			name,
			x: 0,
			y: 0,
			symbol: "image://" + imageData,
		});
		if (dataSource.children && dataSource.children.length) {
			otherArr = dataSource.children;
		}
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
		if (nodeLength <= 5) {
			zoom = 0.7;
		}
		let oneOption = {
			series: [
				{
					type: "graph",
					symbolSize: 40,
					zoom,
					data: nodesData,
					animation: false,
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
		let ystep = 25;
		const { name, imageData } = dataSource;
		nodesData.push({
			coordType: "master",
			name,
			x: 0,
			y: 0,
			symbol: "image://" + imageData,
		});
		if (dataSource.children && dataSource.children.length) {
			mainArr = dataSource.children;
			mainArr.map((subItem) => {
				if (subItem.children && subItem.children.length) {
					subItem.children.map((item) => {
						otherArr.push(item);
					});
				}
			});
		}

		if (mainArr.length) {
			//分节点
			mainArr.map((item, index) => {
				nodesData.push({
					name: item.name,
					coordType: item.sourceData,
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
			let letSum = -25;
			let rightSum = -25;
			let leftArr = [];
			let rightArr = [];
			otherArr.map((item) => {
				if (item.parentType === "left") {
					item.y = letSum += ystep;
					nodesData.push({
						name: item.name,
						sourceData: item.sourceData,
						x: -100,
						y: item.y,
						symbol: "image://" + item.imageData,
					});
					leftArr.push(item);
				} else {
					item.y = rightSum += ystep;
					nodesData.push({
						name: item.name,
						sourceData: item.sourceData,
						x: 100,
						y: item.y,
						symbol: "image://" + item.imageData,
					});
					rightArr.push(item);
				}
			});
			const middleY = this.getCoord(leftArr, ystep);
			nodesData.map((item) => {
				if (item.coordType) {
					item.y = middleY;
				}
				linesData.push({
					source: item.sourceData,
					target: item.name,
				});
			});
		}

		let oneOption = {
			series: [
				{
					type: "graph",
					symbolSize: 30,
					zoom: 1,
					animation: false,
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
		let xstep = 25;
		let sum = 0;
		dataSource.map((item, index) => {
			const { name, imageData } = item;
			if (!index) {
				nodesData.push({
					name,
					x: 0,
					y: 0,
					symbol: "image://" + imageData,
				});
			} else {
				item.x = sum += xstep;
				nodesData.push({
					name,
					x: item.x,
					y: 0,
					symbol: "image://" + item.imageData,
				});
			}
		});
		for (var i = 0; i < dataSource.length; i++) {
			if (dataSource[i + 1]) {
				let isDotted = dataSource[i].type === "start" || dataSource[i + 1].type === "end";
				linesData.push({
					source: dataSource[i].name,
					target: dataSource[i + 1].name,
					lineStyle: {
						type: isDotted ? "dotted" : "solid",
					},
				});
			}
		}
		let oneOption = {
			series: [
				{
					type: "graph",
					symbolSize: 40,
					zoom: 1,
					animation: false,
					// edgeSymbol: ["none", "arrow"],
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
	//计算坐标
	getCoord(coordArr, ystep) {
		let isBoth = coordArr.length % 2 == 0;
		let middleY = 0;
		if (isBoth) {
			//数组双数
			if (coordArr.length / 2 === 1) {
				//二个子集
				middleY = (coordArr[0].y + coordArr[1].y) / 2;
			} else {
				let maxIndex = coordArr.length / 2 - 1;
				let minIndex = maxIndex - 1;
				middleY = (coordArr[maxIndex].y + coordArr[minIndex].y) / 2 + ystep;
			}
		} else {
			//单数
			let maxIndex = Math.floor(coordArr.length / 2);
			middleY = coordArr[maxIndex].y;
		}
		return middleY;
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
				<h3>平铺连线</h3>
				<div style={{ height: 160, width: "50%" }}>
					<ReactEchart style={{ height: "100%" }} option={twoOption} />
				</div>
				<h3>平铺一对多</h3>
				<div style={{ height: 300, width: "50%" }}>
					<ReactEchart style={{ height: "100%" }} option={threeOption} />
				</div>
			</div>
		);
	}
}
export default App;
