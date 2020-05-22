import * as React from 'react';
import { markdown, ReactSpecimen } from 'catalog';
import { Intro } from '../components/IntroScreen';

export default () => markdown`
${
    <ReactSpecimen >
         <Intro />
    </ReactSpecimen>
}
`;