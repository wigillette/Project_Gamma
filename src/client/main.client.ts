import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;
import Main from "./Components/Main";

const app = Roact.createElement(Main);
Roact.mount(app, playerGui, "Main");
