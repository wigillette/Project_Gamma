import Roact from "@rbxts/roact";
import Circle from "client/Components/Base/Circle";
import { Players, SoundService, TweenService } from "@rbxts/services";
import { AudioLibrary } from "shared/AudioInfo";

export const rippleEffect = (frame: Frame, mouse: Mouse) => {
	const newCircle = Roact.createElement(Circle, {
		xPos: mouse.X,
		yPos: mouse.Y,
		frame: frame,
	});

	coroutine.wrap(() => {
		// Mount the newCircle onto the label
		const tree = Roact.mount(newCircle, frame);
		wait(0.25);
		Roact.unmount(tree);
	})();
};

export const playSFX = (category: string, key: string) => {
	const audioCategory = AudioLibrary[category as keyof typeof AudioLibrary];
	const audioID = audioCategory[key as keyof typeof audioCategory];
	const audioObject = new Instance("Sound");
	audioObject.SoundId = audioID;
	audioObject.Parent = SoundService;
	const connection = audioObject.Ended.Connect(() => {
		audioObject.Destroy();
		connection.Disconnect();
	});
	audioObject.Play();
};

const gradientConnections: RBXScriptConnection[] = [];

export const gradientFollow = (
	gradientObject: UIGradient,
	buttonObject: ImageButton,
	query: boolean,
	iconGradientObject?: UIGradient,
) => {
	const mouse = Players.LocalPlayer.GetMouse();
	let moveAnim: Tween | undefined = undefined;
	const tweenInfo = new TweenInfo(0.1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out, 0, false, 0);

	if (query) {
		// If entering the UI
		const connection = mouse.Move.Connect(() => {
			if (!moveAnim) {
				moveAnim = TweenService.Create(gradientObject, tweenInfo, {
					Offset: new Vector2(
						(mouse.X - buttonObject.AbsolutePosition.X) / buttonObject.AbsoluteSize.X,
						(mouse.Y - buttonObject.AbsolutePosition.Y) / buttonObject.AbsoluteSize.Y - 0.5,
					),
				});
				moveAnim.Completed.Connect(() => (moveAnim = undefined));
				moveAnim.Play();
			}
		});
		gradientConnections.push(connection);
	} else {
		// If leaving the UI
		gradientConnections.forEach((connection) => connection.Disconnect());
		gradientConnections.clear();

		moveAnim = TweenService.Create(gradientObject, tweenInfo, {
			Offset: new Vector2(0, 0),
		});
		moveAnim.Completed.Connect(() => (moveAnim = undefined));
		moveAnim.Play();
	}
	if (iconGradientObject) {
		TweenService.Create(iconGradientObject, tweenInfo, { Offset: new Vector2(0, query ? -0.25 : 0) }).Play();
	}
};
