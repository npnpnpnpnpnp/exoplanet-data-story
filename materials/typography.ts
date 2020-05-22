import styled, { css } from 'react-emotion';
import { neutralGrey } from './color';
import { small, medium } from './breakpoints';

export const ParagraphContent = styled('p')`
  font-size: 2rem;
  line-height: 2.5rem;
  color: ${neutralGrey};
`;

export const hintLabel = css`
	font-size: 14px;
	font-weight: 700;
	font-family: sans-serif;
`;
export const legendType = css`
	color: ${neutralGrey};
	font-family: 'IBM Plex Mono';
	font-size: 14px;
`;
export const FooterHeading = styled('h1')`
  line-height: 120%;
  margin: 2.5rem 0 1.25rem 0;
  color: ${neutralGrey};
  @media (max-width: ${small}px)  {
      font-size: 1rem;
  };

  @media (min-width: ${small}px) and (max-width: ${medium}px) {
      font-size: 1.1rem;
  };

  @media (min-width: ${medium}px) {
      font-size: 1.2rem;
  };
`;
