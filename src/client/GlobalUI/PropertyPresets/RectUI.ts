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
	ZIndex: 4,
};

export const MenuAspectRatio: Partial<WritableInstanceProperties<UIAspectRatioConstraint>> = {
	AspectRatio: 1.5,
	DominantAxis: Enum.DominantAxis.Width,
	AspectType: Enum.AspectType.ScaleWithParentSize,
};

// Inner Rectangle Properties
export const Title: Partial<WritableInstanceProperties<TextLabel>> = {
	...RectText,
	Size: new UDim2(0.8, 0, 0.9, 0),
	Position: new UDim2(0.5, 0, 0.5, 0),
	AnchorPoint: new Vector2(0.5, 0.5),
	ZIndex: 4,
};

export const Header: Partial<WritableInstanceProperties<ImageLabel>> = {
	Image: ImageLibrary.UI.RoundRect,
	ScaleType: Enum.ScaleType.Slice,
	SliceCenter: new Rect(10, 10, 10, 10),
	BackgroundTransparency: 1,
	ZIndex: 3,
	Position: new UDim2(0.5, 0, 0, 0),
	Size: new UDim2(1, 0, 0.2, 0),
	AnchorPoint: new Vector2(0.5, 0),
};

export const Body: Partial<WritableInstanceProperties<ImageLabel>> = {
	Image: ImageLibrary.UI.RoundRect,
	AnchorPoint: new Vector2(0.5, 0.85),
	Position: new UDim2(0.5, 0, 0.85, 0),
	BackgroundTransparency: 1,
	ScaleType: Enum.ScaleType.Slice,
	SliceCenter: new Rect(10, 10, 10, 10),
	ZIndex: 3,
	Size: new UDim2(0.95, 0, 0.5, 0),
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
	...RectContainer,
	ClipsDescendants: true,
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

// Card Properties
export const CardButtonFrame: Partial<WritableInstanceProperties<Frame>> = {
	...RippleFrame,
	Position: new UDim2(0.5, 0, 0.95, 0),
	AnchorPoint: new Vector2(0.5, 0.95),
	Size: new UDim2(0.75, 0, 0.25, 0),
	ZIndex: 4,
};

export const CardTitle: Partial<WritableInstanceProperties<TextLabel>> = {
	...RectText,
	Size: new UDim2(0.9, 0, 0.3, 0),
	Position: new UDim2(0.5, 0, 0.05, 0),
	AnchorPoint: new Vector2(0.5, 0.05),
	ZIndex: 4,
};

export const ButtonText: Partial<WritableInstanceProperties<TextLabel>> = {
	...RectText,
	Size: new UDim2(0.9, 0, 0.9, 0),
	Position: new UDim2(0.5, 0, 0.5, 0),
	AnchorPoint: new Vector2(0.5, 0.5),
	ZIndex: 7,
};

export const CardButtonAspectRatio: Partial<WritableInstanceProperties<UIAspectRatioConstraint>> = {
	...ButtonAspectRatio,
	AspectRatio: 3.5,
};
