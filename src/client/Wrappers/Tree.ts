import SKILL_INFO, { skillData } from "shared/SkillInfo";

export class TreeNode {
	static downscaleFactor = 1.5;
	static X_OFFSET = 0.175;
	static Y_OFFSET = 0.35;
	name: string;
	minLevel: number;
	left: TreeNode | undefined;
	right: TreeNode | undefined;
	postReqs: Array<[keyof typeof SKILL_INFO, skillData]>;
	preReqs: Array<[keyof typeof SKILL_INFO, skillData]>;
	x: number;
	y: number;
	branchScaleFactor: number;

	constructor(
		name: string,
		minLevel: number,
		preReqs: Array<keyof typeof SKILL_INFO>,
		postReqs: Array<keyof typeof SKILL_INFO>,
	) {
		this.name = name;
		this.minLevel = minLevel;
		this.left = undefined;
		this.right = undefined;
		this.x = 0;
		this.y = 0;
		this.preReqs = preReqs.map((req) => [req, SKILL_INFO.get(req as string) as skillData]);
		this.postReqs = postReqs.map((req) => [req, SKILL_INFO.get(req as string) as skillData]);
		this.branchScaleFactor = TreeNode.downscaleFactor;
	}

	computeYCoords(y: number, newYOffset: number) {
		this.y = y;
		const newY = y + newYOffset;
		if (this.left) {
			this.left.computeYCoords(newY, newYOffset / TreeNode.downscaleFactor);
		}
		if (this.right) {
			this.right.computeYCoords(newY, newYOffset / TreeNode.downscaleFactor);
		}
	}

	computeXCoords(x: number, newXOffset: number) {
		this.branchScaleFactor = TreeNode.downscaleFactor;
		this.x = x;
		const newX1 = x - newXOffset;
		const newX2 = x + newXOffset;
		if (this.left) {
			this.left.computeXCoords(newX1, newXOffset / TreeNode.downscaleFactor);
		}
		if (this.right) {
			this.right.computeXCoords(newX2, newXOffset / TreeNode.downscaleFactor);
		}
	}
}

export class Tree {
	root: TreeNode;
	nodes: TreeNode[];
	constructor(root: [keyof typeof SKILL_INFO, skillData]) {
		this.root = new TreeNode(
			root[0] as string,
			root[1].minLevel,
			root[1].preReqs as (keyof typeof SKILL_INFO)[],
			root[1].postReqs as (keyof typeof SKILL_INFO)[],
		);
		this.nodes = [this.root];
	}

	initChildren(currentNode: TreeNode) {
		const childNodes = currentNode.postReqs.map(
			(child) =>
				new TreeNode(
					child[0] as string,
					child[1].minLevel,
					child[1].preReqs as (keyof typeof SKILL_INFO)[],
					child[1].postReqs as (keyof typeof SKILL_INFO)[],
				),
		);
		childNodes.forEach((node) => this.nodes.push(node));

		currentNode.left = childNodes.size() > 0 ? childNodes[0] : undefined;
		currentNode.right = childNodes.size() > 1 ? childNodes[1] : undefined;
		if (currentNode.left) {
			this.initChildren(currentNode.left);
		}
		if (currentNode.right) {
			this.initChildren(currentNode.right);
		}
	}
}
