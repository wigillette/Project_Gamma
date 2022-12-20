import Roact from "@rbxts/roact";
import { Gradient } from "../../GlobalUI/Fragments/Gradient";
import { darkMaterial } from "../../GlobalUI/Contexts/MaterialThemes";
import {
	RectBG,
	RectContainer,
	RectShadow,
	SquareAspectRatio,
	CardButtonAspectRatio,
	CardButtonFrame,
	RectButtonBG,
	ButtonText,
	CardTitle,
} from "client/GlobalUI/PropertyPresets/RectUI";
import { playSFX, rippleEffect } from "client/GlobalUI/Effects";
import { Players } from "@rbxts/services";

interface UIProps {
	owned: boolean;
	position: UDim2;
	skillName: string;
	requiredLevel: string;
}

class SkillItem extends Roact.Component<UIProps> {
	frameRef: Roact.Ref<Frame>;
	paddingSize: UDim;
	itemSize: UDim2;

	constructor(props: UIProps) {
		super(props);
		this.paddingSize = new UDim(0.08, 0);
		this.itemSize = new UDim2(0.1, 0, 0.1, 0);
		this.frameRef = Roact.createRef<Frame>();
	}

	render() {
		return Roact.createElement(darkMaterial.Consumer, {
			render: (theme) => (
				<frame
					{...RectContainer}
					Size={this.itemSize}
					Position={this.props.position}
					AnchorPoint={new Vector2(this.props.position.X.Scale, this.props.position.Y.Scale)}
					ZIndex={5}
				>
					<uipadding
						PaddingBottom={this.paddingSize}
						PaddingTop={this.paddingSize}
						PaddingLeft={this.paddingSize}
						PaddingRight={this.paddingSize}
					></uipadding>
					<imagelabel {...RectBG} ZIndex={6}>
						<textlabel
							{...CardTitle}
							Font={theme.midFont}
							Text={this.props.skillName}
							TextColor3={theme.cardTitleColor}
							ZIndex={7}
						></textlabel>
						<Gradient startColor={theme.cardColor} />
						<frame {...CardButtonFrame} Ref={this.frameRef} ZIndex={7}>
							<imagebutton
								{...RectButtonBG}
								ZIndex={8}
								Event={{
									MouseButton1Click: () => {
										playSFX("UI", "Click");
										rippleEffect(this.frameRef.getValue() as Frame, Players.LocalPlayer.GetMouse());
									},
									MouseEnter: (rbx) => {
										playSFX("UI", "Hover");
									},
									MouseLeave: (rbx) => {},
								}}
							>
								<Gradient
									startColor={theme.buttonColor}
									aspectRatio={CardButtonAspectRatio.AspectRatio}
								></Gradient>
								<textlabel
									{...ButtonText}
									Font={theme.midFont}
									Text={this.props.requiredLevel}
									TextColor3={theme.textColor}
									ZIndex={9}
								></textlabel>
							</imagebutton>
							<imagelabel {...RectShadow} ZIndex={7} ImageColor3={theme.buttonShadowColor}>
								<uiaspectratioconstraint {...CardButtonAspectRatio}></uiaspectratioconstraint>
							</imagelabel>
						</frame>
					</imagelabel>
					<imagelabel {...RectShadow} ImageColor3={theme.cardShadow} ZIndex={4}></imagelabel>
					<uiaspectratioconstraint {...SquareAspectRatio}></uiaspectratioconstraint>
				</frame>
			),
		});
	}
}

export default SkillItem;
