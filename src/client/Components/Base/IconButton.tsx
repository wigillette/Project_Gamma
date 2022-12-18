import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import { gradientFollow, rippleEffect } from "../../GlobalUI/Effects";
import { Gradient } from "../../GlobalUI/Fragments/Gradient";
import { darkMaterialContext } from "../../GlobalUI/Contexts/MaterialThemes";

interface UIProps {
	position: UDim2;
}

class IconButton extends Roact.Component<UIProps> {
	frameRef: Roact.Ref<Frame>;
	gradientRef: Roact.Ref<UIGradient>;
	iconGradient: Roact.Ref<UIGradient>;

	constructor(props: UIProps) {
		super(props);
		this.iconGradient = Roact.createRef<UIGradient>();
		this.frameRef = Roact.createRef<Frame>();
		this.gradientRef = Roact.createRef<UIGradient>();
	}

	render() {
		return Roact.createElement(darkMaterialContext.Consumer, {
			render: (theme) => (
				<frame
					BorderSizePixel={0}
					Size={new UDim2(0.1, 0, 0.1, 0)}
					Position={this.props.position}
					BackgroundTransparency={1}
					AnchorPoint={new Vector2(0.025, 0.975)}
					Ref={this.frameRef}
					ClipsDescendants={true}
				>
					<imagebutton
						Size={new UDim2(1, 0, 1, -3)}
						Position={new UDim2(0.5, 0, 0.5, -2.25)}
						AnchorPoint={new Vector2(0.5, 0.5)}
						Image={"rbxassetid://5351051547"}
						ScaleType={Enum.ScaleType.Slice}
						SliceCenter={new Rect(10, 10, 10, 10)}
						BackgroundTransparency={1}
						ZIndex={2}
						Event={{
							MouseButton1Click: () => {
								rippleEffect(this.frameRef.getValue() as Frame, Players.LocalPlayer.GetMouse());
							},
							MouseEnter: (rbx) => {
								gradientFollow(
									this.gradientRef.getValue() as UIGradient,
									rbx,
									true,
									this.iconGradient.getValue() as UIGradient,
								);
							},
							MouseLeave: (rbx) => {
								gradientFollow(
									this.gradientRef.getValue() as UIGradient,
									rbx,
									false,
									this.iconGradient.getValue() as UIGradient,
								);
							},
						}}
					>
						<Gradient gradientRef={this.gradientRef} startColor={theme.buttonColor} />
						<imagelabel
							Size={new UDim2(0.8, 0, 0.8, 0)}
							Position={new UDim2(0.5, 0, 0.5, 0)}
							AnchorPoint={new Vector2(0.5, 0.5)}
							BackgroundTransparency={1}
							Image={"rbxassetid://5521193430"}
							ZIndex={3}
						>
							<uigradient Ref={this.iconGradient} Rotation={90} Color={theme.iconColor}></uigradient>
							<uiaspectratioconstraint
								AspectRatio={1.0}
								DominantAxis={Enum.DominantAxis.Width}
							></uiaspectratioconstraint>
						</imagelabel>
					</imagebutton>
					<imagelabel
						Size={new UDim2(1, 0, 1, 0)}
						Position={new UDim2(0.5, 0, 0.5, 0)}
						AnchorPoint={new Vector2(0.5, 0.5)}
						Image={"rbxassetid://5351051547"}
						ImageColor3={theme.buttonShadowColor}
						ScaleType={Enum.ScaleType.Slice}
						BackgroundTransparency={1}
						SliceCenter={new Rect(10, 10, 10, 10)}
						ZIndex={1}
					></imagelabel>
					<uiaspectratioconstraint
						AspectRatio={1.0}
						DominantAxis={Enum.DominantAxis.Width}
					></uiaspectratioconstraint>
				</frame>
			),
		});
	}
}

export default IconButton;
