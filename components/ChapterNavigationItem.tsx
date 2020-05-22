import * as React from 'react';
import styled from 'react-emotion';
import { neutralGrey } from '../materials/color';
import { ChapterLabel } from 'types/types';

export interface NavigationItem {
	title: ChapterLabel;
	yPosition: number;
	activeState: boolean;
}

const NavItem = styled('div')(
	{
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	(props: { height: number }) => ({
		height: props.height
	})
);

const NavDot = styled('div')`
  background-color: ${neutralGrey};
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 8px;
  margin-right: 0.5rem;
`;

const NavTitle = styled('a')(
	{
		fontFamily: 'IBM Plex Mono',
		fontSize: '1rem',
		lineHeight: '120%'
	},
	(props: any) => ({
		color: neutralGrey,
		fontWeight: props.active ? 700 : 400
	})
);

export class ChapterNavigationItem extends React.Component<NavigationItem> {
	render() {
		return (
			<NavItem height={this.props.yPosition}>
				<NavDot />
				<NavTitle active={this.props.activeState}>{this.props.title}</NavTitle>
			</NavItem>
		);
	}
}
