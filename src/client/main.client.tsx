import Roact from "@rbxts/roact";
import { Players, TweenService } from "@rbxts/services";
import Circle from "./circle";
const playerGui = Players.LocalPlayer.FindFirstChild("PlayerGui") as PlayerGui;

interface UIProps {
	position: UDim2;
}

interface UIState {
	text: string;
}

const rippleEffect = (frame: Frame, mouse: Mouse) => {
	const newCircle = Roact.createElement(Circle, {
		xPos: mouse.X,
		yPos: mouse.Y,
		frame: frame,
	});

	coroutine.wrap(() => {
		// Mount the newCircle onto the label
		const tree = Roact.mount(newCircle, frame);
		wait(0.5);
		Roact.unmount(tree);
	})();
};

function ButtonAttributes() {
	return (
		<Roact.Fragment>
			<uiaspectratioconstraint AspectRatio={3.0} DominantAxis={Enum.DominantAxis.Width}></uiaspectratioconstraint>
			<uigradient
				Color={new ColorSequence(Color3.fromRGB(255, 0, 0), Color3.fromRGB(125, 0, 0))}
				Rotation={90}
			></uigradient>
		</Roact.Fragment>
	);
}
function ShadowAttributes() {
	return (
		<Roact.Fragment>
			<uiaspectratioconstraint AspectRatio={3.0} DominantAxis={Enum.DominantAxis.Width}></uiaspectratioconstraint>
			<uigradient
				Color={new ColorSequence(Color3.fromRGB(150, 0, 0), Color3.fromRGB(25, 0, 0))}
				Rotation={90}
			></uigradient>
		</Roact.Fragment>
	);
}

class UI extends Roact.Component<UIProps, UIState> {
	textLabelRef: Roact.Ref<TextLabel>;
	frameRef: Roact.Ref<Frame>;
	state = {
		text: "Hello World",
	};

	constructor(props: UIProps) {
		super(props);
		this.textLabelRef = Roact.createRef<TextLabel>();
		this.frameRef = Roact.createRef<Frame>();
	}

	render() {
		return (
			<Roact.Portal target={playerGui}>
				<screengui ResetOnSpawn={false}>
					<frame
						BorderSizePixel={0}
						Size={new UDim2(0.25, 0, 0.25, 0)}
						Position={this.props.position}
						BackgroundTransparency={1}
						AnchorPoint={new Vector2(0.5, 0.5)}
						Ref={this.frameRef}
						ClipsDescendants={true}
					>
						<imagebutton
							Size={new UDim2(1, 0, 1, 0)}
							Position={new UDim2(0.5, 0, 0.5, -3)}
							AnchorPoint={new Vector2(0.5, 0.5)}
							Image={"rbxassetid://5351051547"}
							ScaleType={Enum.ScaleType.Slice}
							SliceCenter={new Rect(10, 10, 10, 10)}
							BackgroundTransparency={1}
							ZIndex={2}
							Event={{
								MouseButton1Click: () => {
									const mouse = Players.LocalPlayer.GetMouse();
									rippleEffect(this.frameRef.getValue() as Frame, mouse);
								},
							}}
						>
							<textlabel
								Text={this.state.text}
								TextScaled={true}
								Position={new UDim2(0.5, 0, 0.5, 0)}
								AnchorPoint={new Vector2(0.5, 0.5)}
								Size={new UDim2(0.9, 0, 0.9, 0)}
								BackgroundTransparency={1}
								Ref={this.textLabelRef}
								TextColor3={Color3.fromRGB(0, 0, 0)}
								TextStrokeTransparency={0.4}
								ZIndex={3}
								Font={Enum.Font.IndieFlower}
								Event={{
									MouseEnter: (obj) => {
										TweenService.Create(
											obj,
											new TweenInfo(
												0.3,
												Enum.EasingStyle.Quad,
												Enum.EasingDirection.Out,
												0,
												false,
												0,
											),
											{
												TextColor3: Color3.fromRGB(255, 255, 255),
											},
										).Play();
										this.setState({ text: "Entered" });
									},
									MouseLeave: (obj) => {
										TweenService.Create(
											obj,
											new TweenInfo(
												0.3,
												Enum.EasingStyle.Quad,
												Enum.EasingDirection.Out,
												0,
												false,
												0,
											),
											{
												TextColor3: Color3.fromRGB(0, 0, 0),
											},
										).Play();
										this.setState({ text: "Left" });
									},
								}}
							/>
							<ButtonAttributes />
						</imagebutton>
						<imagelabel
							Size={new UDim2(1, 0, 1, 0)}
							Position={new UDim2(0.5, 0, 0.5, 0)}
							AnchorPoint={new Vector2(0.5, 0.5)}
							Image={"rbxassetid://5351051547"}
							ScaleType={Enum.ScaleType.Slice}
							BackgroundTransparency={1}
							SliceCenter={new Rect(10, 10, 10, 10)}
							ZIndex={1}
						>
							<ShadowAttributes />
						</imagelabel>
						<uiaspectratioconstraint
							AspectRatio={3.0}
							DominantAxis={Enum.DominantAxis.Width}
						></uiaspectratioconstraint>
					</frame>
				</screengui>
			</Roact.Portal>
		);
	}

	protected didMount(): void {
		const textLabel = this.textLabelRef.getValue() as TextLabel;
		textLabel.GetPropertyChangedSignal("Text").Connect(() => {
			print(textLabel.Text);
		});
	}
}

Roact.mount(<UI position={new UDim2(0.5, 0, 0.4, 0)} />);
