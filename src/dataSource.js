const imageData =
	"data:image/png;base64,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";

let oneMoreData = {
	name: "bond",
	imageData,
	children: [
		{
			name: "网口2",
			imageData,
		},
		{
			name: "网口3",
			imageData,
		},
		{
			name: "网口4",
			imageData,
		},
	],
};
let twoMoreData = {
	name: "br1",
	imageData,
	children: [
		{
			name: "bond0",
			imageData,
		},
		{
			name: "bond1",
			imageData,
		},
	],
};

let noLineMoreData = [
	{
		name: "bond0",
		imageData,
	},
	{
		name: "bond1",
		imageData,
	},
	{
		name: "bond2",
		imageData,
	},
	{
		name: "bond3",
		imageData,
	},
];

let threeMoreData = {
	name: "br1",
	sourceData: "master",
	imageData,
	children: [
		{
			name: "bond0",
			sourceData: "minor",
			imageData,
			children: [
				{
					name: "网口4",
					sourceData: "bond0",
					imageData,
				},
				{
					name: "网口4-2",
					sourceData: "bond0",
					imageData,
				},
				{
					name: "网口5",
					sourceData: "bond0",
					imageData,
				},
			],
		},
		{
			name: "bond1",
			sourceData: "minor",
			imageData,
			children: [
				{
					name: "网口6",
					sourceData: "bond1",
					imageData,
				},
				{
					name: "网口7",
					sourceData: "bond1",
					imageData,
				},
				{
					name: "网口8",
					sourceData: "bond1",
					imageData,
				},
			],
		},
	],
};

export { oneMoreData, twoMoreData, threeMoreData, noLineMoreData };
