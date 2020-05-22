import * as React from 'react';
import { Catalog, pageLoader } from 'catalog';

const pagesList = [
	{
		path: '/',
		title: 'Introduction',
		content: pageLoader(() => import('../docs/Introduction.docs'))
	},
	{
		title: 'Material',
		pages: [
			{
				path: '/typography',
				title: 'Typography',
				content: pageLoader(() => import('../docs/Typography.docs'))
			},
			{
				path: '/color',
				title: 'Color',
				content: pageLoader(() => import('../docs/Color.docs'))
			},
			{
				path: '/layout',
				title: 'Layout',
				content: pageLoader(() => import('../docs/Layout.docs'))
			},
			] 
	},
	{
		title: 'Components',
		pages: [
		{
			path: '/chapter-navigation',
			title: 'Chapter Navigation',
			content: pageLoader(() => import('../docs/ChapterNavigation.docs'))
		},
		{
			path: '/intro-screen',
			title: 'Intro Screen',
			content: pageLoader(() => import('../docs/IntroScreen.docs'))
		},
		] 
	}
];

export default class extends React.PureComponent {
	state = { isMounted: false };

	componentDidMount() {
		this.setState({ isMounted: true });
	}

	render() {
		if (!this.state.isMounted) {
			return null;
		} else {
			return (
				<React.Fragment>
					<Catalog title="Exoplanets Data Story" pages={pagesList} />
				</React.Fragment>
			);
		}
	}
}
