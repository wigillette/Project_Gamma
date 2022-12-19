import Roact from "@rbxts/roact";
import RoactRodux from "@rbxts/roact-rodux";
import { movingFadeAbsolute } from "../../GlobalUI/Effects";
import { Gradient } from "../../GlobalUI/Fragments/Gradient";
import { darkMaterial } from "../../GlobalUI/Contexts/MaterialThemes";
import {
	RectBG,
	RectContainer,
	RectShadow,
	SquareAspectRatio,
	CardTitle,
} from "client/GlobalUI/PropertyPresets/RectUI";

interface UIProps {
	owned: boolean;
	position: UDim2;
	skillName: string;
	requiredLevel: string;
}

class SkillItem extends Roact.Component<UIProps> {
	frameRef: Roact.Ref<Frame>;

	constructor(props: UIProps) {
		super(props);
		this.frameRef = Roact.createRef<Frame>();
	}

	render() {
		return Roact.createElement(darkMaterial.Consumer, {
			render: (theme) => (
				<frame
					{...RectContainer}
					Size={new UDim2(0.075, 0, 0.075, 0)}
					Position={this.props.position}
					AnchorPoint={new Vector2(this.props.position.X.Scale, this.props.position.Y.Scale)}
					Ref={this.frameRef}
				>
					<imagelabel {...RectBG}>
						<textlabel
							{...CardTitle}
							Font={theme.titleFont}
							Text={this.props.skillName}
							TextColor3={theme.textColor}
						></textlabel>
						<Gradient startColor={theme.cardColor} />
					</imagelabel>
					<imagelabel {...RectShadow} ImageColor3={theme.cardShadow}></imagelabel>
					<uiaspectratioconstraint {...SquareAspectRatio}></uiaspectratioconstraint>
				</frame>
			),
		});
	}
}

export default SkillItem;
