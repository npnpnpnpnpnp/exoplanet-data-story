import * as React from 'react';
import { markdown, ReactSpecimen } from 'catalog';
import { HeadingIntro, ParagraphIntro } from '../materials/typography';

export default () => markdown`

# Intro
## Heading

${
    <ReactSpecimen>
         <HeadingIntro>TEST HEADING</HeadingIntro>
    </ReactSpecimen>
}

## Paragraph

${
    <ReactSpecimen >
         <ParagraphIntro>TEST HEADING</ParagraphIntro>
    </ReactSpecimen>
}
`;
