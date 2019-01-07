import * as React from 'react';
import RX from 'reactxp';
import Navigator, {NavigatorDelegateSelector as DelegateSelector, Types as NavTypes} from 'reactxp-navigation';
import {SampleList} from './SampleList';
import {Colors} from '../app/Styles';
import {ComponentBase} from 'resub';

enum NavigationRouteId {
    MainPanel,
    SampleListPanel,
}

const styles = {
    // Standard navigator style should be an object. So we have to disable caching here.
    navCardStyle: RX.Styles.createViewStyle({
        backgroundColor: 'white',
    }, false),
    textStyle: RX.Styles.createTextStyle({
        borderColor: Colors.black,
        borderWidth: 1,
        minHeight: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
    }),
    container: RX.Styles.createButtonStyle({
        alignSelf: 'stretch',
        borderColor: Colors.borderSeparatorLight,
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Colors.white,
    }),
};

export class MainView extends ComponentBase<RX.CommonProps, RX.Stateless> {
    private _navigator: Navigator | undefined;

    public componentDidMount() {
        if (this._navigator) {
            this._navigator.immediatelyResetRouteStack([{
                routeId: NavigationRouteId.MainPanel,
                sceneConfigType: NavTypes.NavigatorSceneConfigType.Fade,
            }]);
        }
    }

    public render(): React.ReactNode {
        return (
            <Navigator
                delegateSelector={DelegateSelector}
                cardStyle={styles.navCardStyle}
                ref={this._onNavigatorRef}
                renderScene={this._renderScene}
            />
        );
    }

    private _onNavigatorRef = (navigator: Navigator) => {
        // Stash away a reference to the mounted navigator
        this._navigator = navigator;

        /*if (this._navigator) {
            this._navigator.immediatelyResetRouteStack(this._createNavigatorRouteStack(
                this.state.navContext as NavModels.StackRootNavContext));
        }*/
    }

    private _renderScene = (navigatorRoute: NavTypes.NavigatorRoute): JSX.Element | null => {
        switch (navigatorRoute.routeId) {
            case NavigationRouteId.MainPanel:
                return (
                    <RX.Text
                        style={styles.textStyle}
                        onPress={this._onPressNavigate}
                    >
                        To SampleList
                    </RX.Text>
                );

            case NavigationRouteId.SampleListPanel:
                return <SampleList/>;
        }

        return null;
    }

    // Called when the user presses a button on the MainPanel
    // to navigate to the SecondPanel.
    private _onPressNavigate = () => {
        this._navigator!!.push({
            routeId: NavigationRouteId.SampleListPanel,
            sceneConfigType:
            NavTypes.NavigatorSceneConfigType.FloatFromRight,
        });
    }

    // Called when the user presses a back button on the
    // SecondPanel to navigate back to the MainPanel.
    // @ts-ignore
    private _onPressBack = () => {
        // this._navigator.pop();
    }

}
