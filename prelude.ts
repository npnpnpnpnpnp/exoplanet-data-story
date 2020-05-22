import { injectGlobal, hydrate } from 'emotion';
import { neutralGrey, mainRed } from './materials/color';

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
	hydrate((window as any).__NEXT_DATA__.ids);
}

injectGlobal`
/* Customized Eric's Meyer CSS reset */
@font-face {
  font-family: 'InterUI';
  font-style: regular;
  font-weight: 400;
  src: url('/static/fonts/Inter-UI-Regular.woff2');
}
@font-face {
  font-family: 'InterUI';
  font-style: regular;
  font-weight: 600;
  src: url('/static/fonts/Inter-UI-SemiBold.woff2');
}
@font-face {
  font-family: 'InterUI';
  font-style: regular;
  font-weight: 700;
  src: url('/static/fonts/Inter-UI-SemiBold.woff2');
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}

body {
  line-height: 1;
  background-color: #252423;
  font-family: InterUI, sans-serif;
  font-weight: 400;
}

ol, ul {
	list-style: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
}

a {
	color: ${neutralGrey};
	text-decoration: underline ${mainRed};
}

a:hover,
a:visited {
	color: ${mainRed};
	text-decoration: underline ${mainRed};
	transition: ease 0.5s;
}
`;
