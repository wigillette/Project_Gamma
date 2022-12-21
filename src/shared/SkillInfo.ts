export interface skillData {
	name: string;
	minLevel: number;
	postReqs: Array<skillData>;
	preReqs: Array<skillData>;
}

const SKILL_INFO: skillData[] = [
	{
		name: "Beginner",
		minLevel: 1,
		postReqs: [],
		preReqs: [],
	},
	{
		name: "Intermediate",
		minLevel: 3,
		postReqs: [],
		preReqs: [],
	},
	{
		name: "Advanced",
		minLevel: 5,
		postReqs: [],
		preReqs: [],
	},
	{
		name: "Legendary",
		minLevel: 7,
		postReqs: [],
		preReqs: [],
	},
];

SKILL_INFO[0].postReqs.push(SKILL_INFO[1]);
SKILL_INFO[0].postReqs.push(SKILL_INFO[2]);
SKILL_INFO[1].postReqs.push(SKILL_INFO[3]);
// potentially change to strings to avoid this?? or use dict?
export default SKILL_INFO;
