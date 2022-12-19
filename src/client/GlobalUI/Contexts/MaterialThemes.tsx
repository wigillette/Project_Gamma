import Roact from "@rbxts/roact";

export const darkMaterial = Roact.createContext({
	backgroundShadowColor: Color3.fromRGB(0, 0, 0),
	backgroundColor: new ColorSequence([
		new ColorSequenceKeypoint(0.0, Color3.fromRGB(40, 40, 40)),
		new ColorSequenceKeypoint(0.5, Color3.fromRGB(20, 20, 20)),
		new ColorSequenceKeypoint(1.0, Color3.fromRGB(0, 0, 0)),
	]),
	buttonShadowColor: Color3.fromRGB(36, 74, 138),
	buttonColor: new ColorSequence([
		new ColorSequenceKeypoint(0.0, Color3.fromRGB(66, 133, 244)),
		new ColorSequenceKeypoint(0.5, Color3.fromRGB(56, 110, 209)),
		new ColorSequenceKeypoint(1.0, Color3.fromRGB(43, 89, 166)),
	]),
	textColor: Color3.fromRGB(255, 255, 255),
	textStrokeTransparency: 0.3,
	iconColor: new ColorSequence([
		new ColorSequenceKeypoint(0.0, Color3.fromRGB(255, 255, 255)),
		new ColorSequenceKeypoint(0.5, Color3.fromRGB(225, 225, 225)),
		new ColorSequenceKeypoint(1.0, Color3.fromRGB(195, 195, 195)),
	]),
	titleFont: Enum.Font.SourceSansBold,
	bodyFont: Enum.Font.SourceSans,
});
