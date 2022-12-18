import Roact from "@rbxts/roact";

interface UIProps {
	startColor: Color3;
	endColor: Color3;
	aspectRatio?: number;
	dominantAxis?: Enum.DominantAxis;
	gradientRef?: Roact.Ref<UIGradient>;
}

export class Gradient extends Roact.Component<UIProps> {
	render() {
		return (
			<Roact.Fragment>
				{this.props.aspectRatio && this.props.dominantAxis ? (
					<uiaspectratioconstraint
						AspectRatio={this.props.aspectRatio}
						DominantAxis={this.props.dominantAxis}
					></uiaspectratioconstraint>
				) : undefined}
				<uigradient
					Ref={this.props.gradientRef}
					Color={
						new ColorSequence([
							new ColorSequenceKeypoint(0, this.props.endColor),
							new ColorSequenceKeypoint(0.5, this.props.startColor),
							new ColorSequenceKeypoint(1.0, this.props.endColor),
						])
					}
					Rotation={90}
				></uigradient>
			</Roact.Fragment>
		);
	}
}
