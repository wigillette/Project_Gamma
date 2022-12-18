import Roact from "@rbxts/roact";
import Circle from "client/circle";

export const rippleEffect = (frame: Frame, mouse: Mouse) => {
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
