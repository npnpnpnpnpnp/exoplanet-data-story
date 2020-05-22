export const CHZ = (ctx: any, x1: number, y1: number, x2: number, y2: number, color: string) => {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.strokeStyle = color;
	ctx.stroke();
};
