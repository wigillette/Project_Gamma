import Roact from "@rbxts/roact";
import RoactRodux from "@rbxts/roact-rodux";
import { movingFadeAbsolute } from "../../GlobalUI/Effects";
import { Gradient } from "../../GlobalUI/Fragments/Gradient";
import { darkMaterial } from "../../GlobalUI/Contexts/MaterialThemes";
import {
	getMenuPosition,
	MenuAspectRatio,
	RectButtonBG,
	RectContainer,
	RectShadow,
} from "client/GlobalUI/PropertyPresets/RectUI";

interface UIProps {
	toggle: boolean;
}

class TreeContainer extends Roact.Component<UIProps> {
	frameRef: Roact.Ref<Frame>;
	buttonGradient: Roact.Ref<UIGradient>;

	constructor(props: UIProps) {
		super(props);
		this.frameRef = Roact.createRef<Frame>();
		this.buttonGradient = Roact.createRef<UIGradient>();
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
					<imagelabel {...RectButtonBG}>
						<Gradient gradientRef={this.buttonGradient} startColor={theme.backgroundColor} />
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
