export interface skillData {
	minLevel: number;
	postReqs: Array<string>;
	preReqs: Array<string>;
}

const SKILL_INFO: Map<string, skillData> = new Map([
	[
		"Supreme",
		{
			minLevel: 13,
			postReqs: [],
			preReqs: ["Advanced"],
		},
	],
	[
		"Prodigy",
		{
			minLevel: 11,
			postReqs: [],
			preReqs: ["Advanced"],
		},
	],
	[
		"Honorary",
		{
			minLevel: 9,
			postReqs: [],
			preReqs: ["Intermediate"],
		},
	],
	[
		"Legendary",
		{
			minLevel: 7,
			postReqs: [],
			preReqs: ["Intermediate"],
		},
	],
	[
		"Advanced",
		{
			minLevel: 5,
			postReqs: ["Prodigy", "Supreme"],
			preReqs: ["Beginner"],
		},
	],
	[
		"Intermediate",
		{
			minLevel: 3,
			postReqs: ["Legendary", "Honorary"],
			preReqs: ["Beginner"],
		},
	],
	[
		"Beginner",
		{
			minLevel: 1,
			postReqs: ["Intermediate", "Advanced"],
			preReqs: [],
		},
	],
]);

export default SKILL_INFO;
