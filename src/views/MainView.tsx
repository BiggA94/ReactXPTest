import {ComponentBase} from 'resub';
import * as React from 'react';
import {SampleList} from './SampleList';

export class MainView extends ComponentBase<{}, {}> {

    public render(): React.ReactNode {
        return (
            <SampleList/>
        );
    }

}
