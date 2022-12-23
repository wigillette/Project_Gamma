import Roact from "@rbxts/roact";
import RoactRodux from "@rbxts/roact-rodux";
import { movingFadeAbsolute } from "../../GlobalUI/Effects";
import { Gradient } from "../../GlobalUI/Fragments/Gradient";
import { darkMaterial } from "../../GlobalUI/Contexts/MaterialThemes";
import SkillItem from "./SkillItem";
import {
	getMenuPosition,
	MenuAspectRatio,
	RectBG,
	RectContainer,
	RectShadow,
	Body,
	Header,
	Title,
} from "client/GlobalUI/PropertyPresets/RectUI";
import { Tree, TreeNode } from "client/Wrappers/Tree";
import SKILL_INFO, { skillData } from "shared/SkillInfo";

interface UIProps {
	toggle: boolean;
}

class TreeContainer extends Roact.Component<UIProps> {
	frameRef: Roact.Ref<Frame>;
	skillTree: Tree;

	constructor(props: UIProps) {
		super(props);
		this.frameRef = Roact.createRef<Frame>();
		this.skillTree = new Tree(["Beginner" as keyof typeof SKILL_INFO, SKILL_INFO.get("Beginner") as skillData]);
		this.skillTree.initChildren(this.skillTree.root);
		this.skillTree.root.computeXCoords(0.5, TreeNode.X_OFFSET);
		this.skillTree.root.computeYCoords(0, TreeNode.Y_OFFSET);
	}

	render() {
		return Roact.createElement(darkMaterial.Consumer, {
			render: (theme) => (
				<frame
					{...RectContainer}
					Size={new UDim2(0.65, 0, 0.65, 0)}
					Position={new UDim2(0.5, 0, 0.2, 0)}
					AnchorPoint={new Vector2(0.5, 0.5)}
					Ref={this.frameRef}
				>
					<imagelabel {...RectBG}>
						<Gradient startColor={theme.backgroundColor} />
						<imagelabel {...Header}>
							<textlabel
								{...Title}
								Font={theme.titleFont}
								Text={"Skill Tree"}
								TextColor3={theme.textColor}
							></textlabel>
							<Gradient startColor={theme.innerBGColor} aspectRatio={10}></Gradient>
						</imagelabel>
						<imagelabel {...Body}>
							<Gradient startColor={theme.innerBGColor} aspectRatio={1.85}></Gradient>
							{this.skillTree.nodes.map((node) => (
								<SkillItem
									owned={false}
									position={new UDim2(node.x, 0, node.y, 0)}
									skillName={node.name}
									requiredLevel={tostring(node.minLevel)}
									hasLeftChild={node.left !== undefined}
									hasRightChild={node.right !== undefined}
									branchScaleFactor={node.branchScaleFactor}
								/>
							))}
						</imagelabel>
					</imagelabel>
					<imagelabel {...RectShadow} ImageColor3={theme.backgroundShadowColor}></imagelabel>
					<uiaspectratioconstraint {...MenuAspectRatio}></uiaspectratioconstraint>
				</frame>
			),
		});
	}

	protected didMount(): void {
		const container = this.frameRef.getValue() as Frame;
		movingFadeAbsolute(container, this.props.toggle, getMenuPosition(this.props.toggle), true);
	}

	protected didUpdate(previousProps: UIProps): void {
		if (this.props.toggle !== previousProps.toggle) {
			const container = this.frameRef.getValue() as Frame;
			movingFadeAbsolute(container, this.props.toggle, getMenuPosition(this.props.toggle), true);
		}
	}
}

interface storeState {
	toggleSkillTree: { toggle: boolean };
}

export = RoactRodux.connect((state: storeState) => {
	return {
		toggle: state.toggleSkillTree.toggle,
	};
})(TreeContainer);
