import Roact from "@rbxts/roact";
import Circle from "client/Components/Base/Circle";
import { Players, SoundService, TweenService, Workspace } from "@rbxts/services";
import { AudioLibrary } from "shared/AudioInfo";

const tweenInfo: TweenInfo = new TweenInfo(0.3, Enum.EasingStyle.Quad, Enum.EasingDirection.Out, 0, false, 0);

// Click Ripple Effect
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

// Playing Sound Effects on Client
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

// Gradient Mouse Follow Effect
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

// Prevent Client-Side Lag
const debounces = new Map<Instance, boolean>();

// Tween the transparency of each of the children of an object
const tweenTransparencyRecurse = (children: Instance[], recurse: boolean, transparency: number) => {
	children.forEach((object: Instance) => {
		if (object.Name !== "Shadow" || transparency !== 0) {
			if (object.IsA("ImageLabel") || object.IsA("ImageButton")) {
				if (object.Name !== "Lock") {
					TweenService.Create(object, tweenInfo, { ImageTransparency: transparency }).Play();
				} else {
					TweenService.Create(object, tweenInfo, {
						ImageTransparency: transparency === 0 ? 0.6 : 1.0,
					}).Play();
				}
			} else if (object.IsA("TextLabel")) {
				TweenService.Create(object, tweenInfo, { TextTransparency: transparency }).Play();
			} else if (object.IsA("ViewportFrame") || object.IsA("ScrollingFrame") || object.IsA("TextBox")) {
				object.Visible = transparency === 0;
			}

			if (recurse) {
				tweenTransparencyRecurse(object.GetChildren(), recurse, transparency);
			}
		}
	});
};

// Begin transparency recursion
export const tweenTransparency = (frame: Frame | ImageLabel, recurse: boolean, fadeIn: boolean) => {
	const transparency = fadeIn ? 0.0 : 1.0;
	if (fadeIn) {
		frame.Visible = fadeIn;
	}

	const children = frame.GetChildren();
	if (frame.IsA("Frame")) {
		if (recurse) {
			if (!fadeIn) {
				TweenService.Create(frame, tweenInfo, {
					BackgroundTransparency: transparency,
				}).Play();
			}
			tweenTransparencyRecurse(children, recurse, transparency);
		} else if (fadeIn) {
			TweenService.Create(frame, tweenInfo, {
				BackgroundTransparency: transparency,
			}).Play();
		}
	} else if (!fadeIn && frame.IsA("ImageLabel")) {
		TweenService.Create(frame, tweenInfo, {
			ImageTransparency: transparency,
		}).Play();
	}

	if (frame.Name !== "Card" && !fadeIn) {
		spawn(() => {
			wait(0.3);
			frame.Visible = false;
		});
	}
};

// Menu Blur Effect On Toggle
const updateBlurEffect = (fadeIn: boolean, key: string) => {
	const camera = Workspace.CurrentCamera;
	if (camera) {
		let blur = camera.FindFirstChild(key) as BlurEffect;
		if (!blur) {
			blur = new Instance("BlurEffect", camera);
			blur.Name = key;
			blur.Parent = camera;
		}
		if (fadeIn) {
			blur.Size = 0;
			blur.Enabled = true;
		}
		TweenService.Create(blur, tweenInfo, {
			Size: (fadeIn && 30) || 0,
		}).Play();
		if (!fadeIn) {
			coroutine.wrap(() => {
				wait(0.3);
				blur.Enabled = false;
				blur.Destroy();
			})();
		}
	}
};

// Tween to a specified position
export const tweenPosAbsolute = (frame: Frame | TextLabel | ImageLabel, position: UDim2) => {
	pcall(() => frame.TweenPosition(position, Enum.EasingDirection.Out, Enum.EasingStyle.Quad, 0.15, true, undefined));
};

// Menu Toggle Fade In/Out
export const movingFadeAbsolute = (
	frame: Frame | ImageLabel,
	fadeIn: boolean,
	position: UDim2,
	blurEffect: boolean,
) => {
	const state = debounces.get(frame);

	if (!state) {
		debounces.set(frame, true);
		// Add the blur effect
		if (blurEffect) {
			updateBlurEffect(fadeIn, frame.Name);
		}
		// Tween the frame
		tweenPosAbsolute(frame, position);
		// Tween the transparency
		tweenTransparency(frame, true, fadeIn);
		debounces.set(frame, false);
	}
};
