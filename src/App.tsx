import React from 'react';
import RX from 'reactxp';
import {SampleObject} from './models/SampleObject';
import {ComponentBase} from 'resub';
import SampleStore from './stores/SampleStore';

const _styles = {
    main: RX.Styles.createViewStyle({
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }),

    title: RX.Styles.createTextStyle({
        fontWeight: 'bold',
        fontSize: 36,
        textAlign: 'center',
    }),

    label: RX.Styles.createTextStyle({
        marginTop: 10,
        textAlign: 'center',
        fontSize: 16,
    }),

    name: RX.Styles.createTextStyle({
        fontWeight: 'bold',
        fontSize: 36,
        color: '#42B74F',
    }),

    links: RX.Styles.createViewStyle({
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    }),

    link: RX.Styles.createLinkStyle({
        textDecorationLine: 'underline',
        paddingRight: 5,
        paddingLeft: 5,
        color: '#0070E0',
    }),
};

const rotateValue = RX.Animated.createValue(0);
const logoAnimationStyle = RX.Styles.createAnimatedViewStyle({
    opacity: rotateValue,
});

const logoRotationAnimation = RX.Animated.sequence([
    RX.Animated.timing(rotateValue,
        {
            toValue: 1,
            delay: 0,
            duration: 2000,
            easing: RX.Animated.Easing.Linear(),
        },
    ),
]);

logoRotationAnimation.start();

interface AppState {
    sampleObjects?: SampleObject[];
}

export class App extends ComponentBase<{}, AppState> {

    protected _buildState(props: {}, initialBuild: boolean): Partial<AppState> | undefined {
        let partialState: Partial<AppState> = {
        };

        partialState.sampleObjects = SampleStore.getSampleObjects();

        return partialState;
    }

    public render() {
        return (
            <RX.Animated.View style={[_styles.main, logoAnimationStyle]}>
                <RX.View>
                    <RX.Text style={_styles.title}>
                        objects:
                        <RX.Text style={_styles.name}>
                            {this.state.sampleObjects!![0].text}
                        </RX.Text>
                    </RX.Text>
                    <RX.Text style={_styles.label}>
                        To get started, edit /src/App.tsx
                    </RX.Text>
                </RX.View>
            </RX.Animated.View>
        );
    }
}
