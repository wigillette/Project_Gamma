import Roact from "@rbxts/roact";
import RoactRodux from "@rbxts/roact-rodux";
import { Players } from "@rbxts/services";
const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;
import Main from "./Components/Main";
import Store from "./Rodux/Store";

const app = Roact.createElement(
	RoactRodux.StoreProvider,
	{
		store: Store,
	},
	{
		Main: Roact.createElement(Main),
	},
);

Roact.mount(app, playerGui, "Main");
