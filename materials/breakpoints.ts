export const small = '550';
export const medium = '900';
export const large = '1000';

const breakpoints = [ small, medium, large ];
export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
