import React from "react";
import { oneMoreData } from "./dataSource";
import ReactEchart from "echarts-for-react";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			oneOption: {},
		};
	}
	componentDidMount() {}
	initOneData(oneMoreData) {
		let nodesData = [];
		let linesData = [];
		let otherArr = [];
		let xstep = 50;
		let ystep = -(xstep / 10) * (oneMoreData.length - 1);
		oneMoreData.map((item, index) => {
			const { name, imageData } = item;
			if (index) {
				//保存子节点
				otherArr.push(item);
			} else {
				nodesData.push({
					name,
					x: 0,
					y: 0,
					symbol: "image://" + imageData,
				});
			}
		});
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
		if (otherArr.length) {
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
	render() {
		const oneOption = this.initOneData(oneMoreData);
		return (
			<div>
				<h3>网桥配置一对多类</h3>
				<div style={{ height: 160, width: "50%" }}>
					<ReactEchart style={{ height: "100%" }} option={oneOption} />
				</div>
			</div>
		);
	}
}
export default App;
