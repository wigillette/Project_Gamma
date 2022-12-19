import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import { gradientFollow, playSFX, rippleEffect } from "../../GlobalUI/Effects";
import { Gradient } from "../../GlobalUI/Fragments/Gradient";
import { darkMaterial } from "../../GlobalUI/Contexts/MaterialThemes";
import {
	ButtonIcon,
	RectButtonBG,
	RectShadow,
	RippleFrame,
	SquareAspectRatio,
} from "client/GlobalUI/PropertyPresets/RectUI";
import { ImageLibrary } from "shared/ImageInfo";

interface UIProps {
	position: UDim2;
	size: UDim2;
	icon: keyof typeof ImageLibrary.MenuIcons;
	callback: () => void;
}

class IconButton extends Roact.Component<UIProps> {
	frameRef: Roact.Ref<Frame>;
	buttonGradient: Roact.Ref<UIGradient>;
	iconGradient: Roact.Ref<UIGradient>;

	constructor(props: UIProps) {
		super(props);
		this.iconGradient = Roact.createRef<UIGradient>();
		this.frameRef = Roact.createRef<Frame>();
		this.buttonGradient = Roact.createRef<UIGradient>();
	}

	render() {
		return Roact.createElement(darkMaterial.Consumer, {
			render: (theme) => (
				<frame
					{...RippleFrame}
					Size={this.props.size}
					Position={this.props.position}
					AnchorPoint={new Vector2(this.props.position.X.Scale, this.props.position.Y.Scale)}
					Ref={this.frameRef}
				>
					<imagebutton
						{...RectButtonBG}
						Event={{
							MouseButton1Click: () => {
								playSFX("UI", "Click");
								rippleEffect(this.frameRef.getValue() as Frame, Players.LocalPlayer.GetMouse());
								this.props.callback();
							},
							MouseEnter: (rbx) => {
								playSFX("UI", "Hover");
								gradientFollow(
									this.buttonGradient.getValue() as UIGradient,
									rbx,
									true,
									this.iconGradient.getValue() as UIGradient,
								);
							},
							MouseLeave: (rbx) => {
								gradientFollow(
									this.buttonGradient.getValue() as UIGradient,
									rbx,
									false,
									this.iconGradient.getValue() as UIGradient,
								);
							},
						}}
					>
						<Gradient gradientRef={this.buttonGradient} startColor={theme.buttonColor} />
						<imagelabel {...ButtonIcon} Image={this.props.icon}>
							<Gradient startColor={theme.iconColor} gradientRef={this.iconGradient} aspectRatio={1} />
						</imagelabel>
					</imagebutton>
					<imagelabel {...RectShadow} ImageColor3={theme.buttonShadowColor}></imagelabel>
					<uiaspectratioconstraint {...SquareAspectRatio}></uiaspectratioconstraint>
				</frame>
			),
		});
	}
}

export default IconButton;
