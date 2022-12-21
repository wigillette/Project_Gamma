let Y_OFFSET = 0.3;
let X_OFFSET = 0.15;
const downscaleFactor = 1.25;

import { skillData } from "shared/SkillInfo";

export class TreeNode {
	name: string;
	minLevel: number;
	left: TreeNode | undefined;
	right: TreeNode | undefined;
	postReqs: Array<skillData>;
	preReqs: Array<skillData>;
	x: number;
	y: number;

	constructor(name: string, minLevel: number, preReqs: Array<skillData>, postReqs: Array<skillData>) {
		this.name = name;
		this.minLevel = minLevel;
		this.left = undefined;
		this.right = undefined;
		this.x = 0;
		this.y = 0;
		this.preReqs = preReqs;
		this.postReqs = postReqs;
	}

	computeYCoords(y: number) {
		this.y = y;
		const newY = y + Y_OFFSET;
		Y_OFFSET /= downscaleFactor;
		if (this.left) {
			this.left.computeYCoords(newY);
		}
		if (this.right) {
			this.right.computeYCoords(newY);
		}
	}

	computeXCoords(x: number) {
		this.x = x;
		const newX1 = x - X_OFFSET;
		const newX2 = x + X_OFFSET;
		X_OFFSET /= downscaleFactor;
		if (this.left) {
			this.left.computeXCoords(newX1);
		}
		if (this.right) {
			this.right.computeXCoords(newX2);
		}
	}
}

export class Tree {
	root: TreeNode;
	nodes: TreeNode[];
	constructor(root: skillData) {
		this.root = new TreeNode(root.name, root.minLevel, root.preReqs, root.postReqs);
		this.nodes = [this.root];
	}

	initChildren(currentNode: TreeNode) {
		const childNodes = currentNode.postReqs.map(
			(child) => new TreeNode(child.name, child.minLevel, child.preReqs, child.postReqs),
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
