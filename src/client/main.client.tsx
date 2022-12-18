import Roact from "@rbxts/roact";
import { Players, TweenService } from "@rbxts/services";
import { rippleEffect } from "./GlobalUI/Effects";
import { Gradient } from "./GlobalUI/Attributes/Gradient";
const playerGui = Players.LocalPlayer.FindFirstChild("PlayerGui") as PlayerGui;

interface UIProps {
	position: UDim2;
}

class UI extends Roact.Component<UIProps> {
	frameRef: Roact.Ref<Frame>;
	gradientRef: Roact.Ref<UIGradient>;
	iconGradient: Roact.Ref<UIGradient>;
	moveConnection: RBXScriptConnection | undefined;
	moveAnim: Tween | undefined;
	state = {
		text: "Hello World",
	};

	constructor(props: UIProps) {
		super(props);
		this.iconGradient = Roact.createRef<UIGradient>();
		this.frameRef = Roact.createRef<Frame>();
		this.gradientRef = Roact.createRef<UIGradient>();
	}

	render() {
		return (
			<Roact.Portal target={playerGui}>
				<screengui ResetOnSpawn={false}>
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
									const mouse = Players.LocalPlayer.GetMouse();
									TweenService.Create(
										this.iconGradient.getValue() as UIGradient,
										new TweenInfo(
											0.1,
											Enum.EasingStyle.Quad,
											Enum.EasingDirection.Out,
											0,
											false,
											0,
										),
										{ Offset: new Vector2(0, -0.25) },
									).Play();
									this.moveConnection = mouse.Move.Connect(() => {
										if (!this.moveAnim) {
											this.moveAnim = TweenService.Create(
												this.gradientRef.getValue() as UIGradient,
												new TweenInfo(
													0.1,
													Enum.EasingStyle.Quad,
													Enum.EasingDirection.Out,
													0,
													false,
													0,
												),
												{
													Offset: new Vector2(
														(mouse.X - rbx.AbsolutePosition.X) / rbx.AbsoluteSize.X,
														(mouse.Y - rbx.AbsolutePosition.Y) / rbx.AbsoluteSize.Y - 0.5,
													),
												},
											);
											this.moveAnim.Completed.Connect(() => {
												this.moveAnim = undefined;
											});
											this.moveAnim.Play();
										}
									});
								},
								MouseLeave: () => {
									if (this.moveConnection) {
										this.moveConnection.Disconnect();
									}
									if (this.moveAnim) {
										this.moveAnim.Cancel();
									}
									TweenService.Create(
										this.iconGradient.getValue() as UIGradient,
										new TweenInfo(
											0.1,
											Enum.EasingStyle.Quad,
											Enum.EasingDirection.Out,
											0,
											false,
											0,
										),
										{ Offset: new Vector2(0, 0) },
									).Play();
									this.moveAnim = TweenService.Create(
										this.gradientRef.getValue() as UIGradient,
										new TweenInfo(
											0.1,
											Enum.EasingStyle.Quad,
											Enum.EasingDirection.Out,
											0,
											false,
											0,
										),
										{
											Offset: new Vector2(0, 0),
										},
									);
									this.moveAnim.Completed.Connect(() => {
										this.moveAnim = undefined;
									});
									this.moveAnim.Play();
								},
							}}
						>
							<Gradient
								gradientRef={this.gradientRef}
								startColor={Color3.fromRGB(225, 0, 0)}
								endColor={Color3.fromRGB(175, 0, 0)}
							/>
							<imagelabel
								Size={new UDim2(0.8, 0, 0.8, 0)}
								Position={new UDim2(0.5, 0, 0.5, 0)}
								AnchorPoint={new Vector2(0.5, 0.5)}
								BackgroundTransparency={1}
								Image={"rbxassetid://5521193430"}
								ZIndex={3}
							>
								<uigradient
									Ref={this.iconGradient}
									Rotation={90}
									Color={
										new ColorSequence(Color3.fromRGB(255, 255, 255), Color3.fromRGB(200, 200, 200))
									}
								></uigradient>
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
							ImageColor3={Color3.fromRGB(100, 0, 0)}
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
				</screengui>
			</Roact.Portal>
		);
	}
}

Roact.mount(<UI position={new UDim2(0.025, 0, 0.975, 0)} />);
