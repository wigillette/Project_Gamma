import Roact from "@rbxts/roact";

interface UIProps {
	startColor: Color3 | ColorSequence;
	endColor?: Color3;
	aspectRatio?: number;
	gradientRef?: Roact.Ref<UIGradient>;
}

export class Gradient extends Roact.Component<UIProps> {
	render() {
		return (
			<Roact.Fragment>
				{this.props.aspectRatio !== undefined ? (
					<uiaspectratioconstraint
						AspectRatio={this.props.aspectRatio}
						DominantAxis={Enum.DominantAxis.Width}
						AspectType={Enum.AspectType.ScaleWithParentSize}
					></uiaspectratioconstraint>
				) : undefined}
				<uigradient
					Ref={this.props.gradientRef}
					Color={
						(this.props.startColor &&
							this.props.endColor &&
							new ColorSequence([
								new ColorSequenceKeypoint(0, this.props.endColor),
								new ColorSequenceKeypoint(0.5, this.props.startColor as Color3),
								new ColorSequenceKeypoint(1.0, this.props.endColor),
							])) ||
						(this.props.startColor as ColorSequence)
					}
					Rotation={90}
				></uigradient>
			</Roact.Fragment>
		);
	}
}
