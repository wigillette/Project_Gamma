import Roact from "@rbxts/roact";
import IconButton from "./Base/IconButton";

const Main = () => {
	return (
		<screengui ResetOnSpawn={false}>
			<IconButton position={new UDim2(0.025, 0, 0.975, 0)}></IconButton>
		</screengui>
	);
};

export default Main;
