import * as React from 'react';
import { ChapterNavigationItem } from './ChapterNavigationItem';
import { chapters } from '../content/content';
import { ChapterId } from 'types/types';
import styled from 'react-emotion';
import { getChapterLabel } from '../utils/getters';
import { medium } from '../materials/breakpoints';

interface Props {
	activeChapter: ChapterId;
}

const ChapterRoot = styled('div')`
  display: none;
  @media (min-width: ${medium}px) {
    width: 250px;
    display: block;
    padding: 2rem;
    position: sticky;
    top: 30vh;
  };
`;

export class ChapterNavigation extends React.Component<Props> {
	render() {
		return (
			<ChapterRoot>
				{chapters.map((chapter) => {
					return (
						<ChapterNavigationItem
							title={getChapterLabel(chapter.title)}
							yPosition={chapter.yPosition}
							activeState={chapter.title === this.props.activeChapter}
						/>
					);
				})}
			</ChapterRoot>
		);
	}
}
