import Roact from "@rbxts/roact";
import { ImageLibrary } from "shared/ImageInfo";
import IconButton from "./Base/IconButton";
import Store from "client/Rodux/Store";
import TreeContainer from "./SkillTree/TreeContainer";

const Main = () => {
	return (
		<screengui ResetOnSpawn={false}>
			<IconButton
				position={new UDim2(0.025, 0, 0.975, 0)}
				size={new UDim2(0.05, 0, 0.05, 0)}
				icon={ImageLibrary.MenuIcons.SkillTree as keyof typeof ImageLibrary.MenuIcons}
				callback={() =>
					Store.dispatch({
						type: "toggleSkillTree",
					})
				}
			></IconButton>
			<TreeContainer />
		</screengui>
	);
};

export default Main;
