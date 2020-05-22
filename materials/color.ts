// UI Color
export const mainBackground = '#252423';
export const mainRed = '#FF9999';
export const neutralGrey = '#E8E6E1';
export const neutralDarkGrey = '#555552';
export const darkGrey = neutralDarkGrey;

// Categorical colors (= Discovery method colors)
export const categorialYellow = '#F6D750';
export const categorialGreen = '#40BA67';
export const categorialBlue = '#8AC8FC';
export const categorialPurple = '#C264EA';
// Discovery method colors
export const pulsarTimingColor = categorialYellow;
export const directImagingColor = categorialGreen;
export const radialVelocityColor = categorialBlue;
export const transitColor = mainRed;
export const otherMethodsColor = neutralGrey;

// Mass class colors
export const mercuryColor = '#46E1DC';
// export const subterranColor = '#FFCC3F';
// export const terranColor = '#abdda4';
// export const superterranColor = '#66c2a5';
export const neptuneColor = '#A6E146';
export const jupiterColor = '#FFAA78';

export const mercuryColorInactive = '#185F5C';
export const neptuneColorInactive = '#496819';
export const jupiterColorInactive = '#8E5F43';

// Hint Colors
export const AUColor = neutralGrey;
export const SunColor = '#FFF100';
export const EarthColor = '#11FFBA';
export const EarthColorInactive = '#0B8763';
export const KeplerColor = '#EDFA81';
export const ProximaColor = '#7D9DF8'; 
export const MarsColor = '#CE4E0F';
export const CHZTooHotColor = '#FF3F5C';
export const CHZJustRightColor = '#FFA121';
export const CHZTooColdColor = '#58C3F9';

// Ranges of colors used in color scales
// Not very elegant solution, but it does the job
export const discoveryMethodsColors = [
	pulsarTimingColor,
	directImagingColor,
	radialVelocityColor,
	transitColor,
	otherMethodsColor
];
export const pulsarTimingColors = [
	pulsarTimingColor,
	otherMethodsColor,
	otherMethodsColor,
	otherMethodsColor,
	otherMethodsColor
];
export const imagingColors = [
	pulsarTimingColor,
	directImagingColor,
	otherMethodsColor,
	otherMethodsColor,
	otherMethodsColor
];
export const velocityColors = [
	pulsarTimingColor,
	directImagingColor,
	radialVelocityColor,
	otherMethodsColor,
	otherMethodsColor
];

export const massClassColors = [ mercuryColor, EarthColor, neptuneColor, jupiterColor ];
