export const Planet = (ctx: any, x: number, y: number, r: number, fillColor: string) => {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI);
	ctx.fillStyle = fillColor;
	ctx.fill();
};
