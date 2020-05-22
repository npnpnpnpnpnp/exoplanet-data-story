import * as React from 'react';
import { markdown, ReactSpecimen } from 'catalog';

import { ChapterNavigation } from '../components/Chapter';
import { NavigationItem } from 'components/ChapterNavigationItem';

const chaptersContent: Array<NavigationItem> = [
	{ title: 'Introduction', activeState: true, yPosition: 0 },
	{ title: 'Discovery', activeState: false, yPosition: 399 },
	{ title: 'Distance', activeState: true, yPosition: 500 },
	{ title: 'Habitability', activeState: true, yPosition: 570 },
	{ title: 'Conclusion', activeState: true, yPosition: 800 }
];

export default () => markdown`

# Chapter Navigation

## Introduction

${(
	<ReactSpecimen>
		<ChapterNavigation chapters={chaptersContent} activeChapter='Introduction' />
	</ReactSpecimen>
)}
`;
