import { ImageLibrary } from "shared/ImageInfo";

// Outer Container
export const getMenuPosition = (fadeIn: boolean) => (fadeIn ? new UDim2(0.5, 0, 0.5, 0) : new UDim2(0.5, 0, 0.2, 0));

export const RectContainer: Partial<WritableInstanceProperties<Frame>> = {
	BackgroundTransparency: 1,
	BorderSizePixel: 0,
};

// Outer Rectangle Properties
export const RectBG: Partial<WritableInstanceProperties<ImageLabel>> = {
	Image: ImageLibrary.UI.RoundRect,
	Position: new UDim2(0.5, 0, 0.5, -2.25),
	Size: new UDim2(1, 0, 1, -3),
	AnchorPoint: new Vector2(0.5, 0.5),
	ScaleType: Enum.ScaleType.Slice,
	SliceCenter: new Rect(10, 10, 10, 10),
	BackgroundTransparency: 1,
	ZIndex: 1,
};

export const RectShadow: Partial<WritableInstanceProperties<ImageLabel>> = {
	...RectBG,
	Position: new UDim2(0.5, 0, 0.5, 0),
	Size: new UDim2(1, 0, 1, 0),
	ZIndex: 0,
};

export const RectText: Partial<WritableInstanceProperties<TextLabel>> = {
	TextScaled: true,
	BackgroundTransparency: 1,
};

export const MenuAspectRatio: Partial<WritableInstanceProperties<UIAspectRatioConstraint>> = {
	AspectRatio: 1.5,
	DominantAxis: Enum.DominantAxis.Width,
	AspectType: Enum.AspectType.ScaleWithParentSize,
};

// Inner Rectangle Properties
export const Header: Partial<WritableInstanceProperties<ImageLabel>> = {
	BackgroundTransparency: 1,
	ZIndex: 2,
	Position: new UDim2(0.5, 0, 0, 0),
	Size: new UDim2(1, 0, 0.2, 0),
	AnchorPoint: new Vector2(0.5, 0),
};

export const Body: Partial<WritableInstanceProperties<ImageLabel>> = {
	AnchorPoint: new Vector2(0.5, 0.9),
	Position: new UDim2(0.5, 0, 0.9, 0),
	BackgroundTransparency: 1,
	ZIndex: 2,
	Size: new UDim2(0.95, 0, 0.75, 0),
};

// Button Properties
export const RectButtonBG: Partial<WritableInstanceProperties<ImageButton>> = {
	...RectBG,
};

export const ButtonAspectRatio: Partial<WritableInstanceProperties<UIAspectRatioConstraint>> = {
	AspectRatio: 4,
	DominantAxis: Enum.DominantAxis.Width,
	AspectType: Enum.AspectType.ScaleWithParentSize,
};

export const RectButtonText: Partial<WritableInstanceProperties<TextLabel>> = {
	AnchorPoint: new Vector2(0.5, 0.5),
	Position: new UDim2(0.5, 0, 0.5, 0),
	Size: new UDim2(0.95, 0, 0.95, 0),
	TextScaled: true,
	BackgroundTransparency: 1,
};

export const RippleFrame: Partial<WritableInstanceProperties<Frame>> = {
	BackgroundTransparency: 1,
	ClipsDescendants: true,
	BorderSizePixel: 0,
};

export const SquareAspectRatio: Partial<WritableInstanceProperties<UIAspectRatioConstraint>> = {
	AspectRatio: 1,
	DominantAxis: Enum.DominantAxis.Width,
	AspectType: Enum.AspectType.ScaleWithParentSize,
};

// Icon Properties
export const ButtonIcon: Partial<WritableInstanceProperties<ImageLabel>> = {
	Size: new UDim2(0.8, 0, 0.8, 0),
	Position: new UDim2(0.5, 0, 0.5, 0),
	AnchorPoint: new Vector2(0.5, 0.5),
	BackgroundTransparency: 1,
	ZIndex: 2,
};
