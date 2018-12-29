import React from 'react';
import RX from 'reactxp';
import {SampleObject} from './models/SampleObject';
import {ComponentBase} from 'resub';
import SampleStore from './stores/SampleStore';

import {VirtualListView, VirtualListViewItemInfo} from 'reactxp-virtuallistview';
import AppListItem from './AppListItem';
import {Colors} from './app/Styles';

interface AppListItemInfo extends VirtualListViewItemInfo {
    sampleObject: SampleObject;
}

interface AppState {
    sampleObjects: AppListItemInfo[];
}

const _styles = {
    listScroll: RX.Styles.createViewStyle({
        flexDirection: 'column',
        alignSelf: 'stretch',
        backgroundColor: Colors.contentBackground,
    }),
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
    container: RX.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: Colors.contentBackground,
    }),
};

const _listItemHeight = 35;

export class App extends ComponentBase<{}, AppState> {

    public render() {
        return (
            <RX.View useSafeInsets={true} style={_styles.container}>
                <VirtualListView
                    itemList={this.state.sampleObjects}
                    renderItem={this._renderItem}
                    style={_styles.listScroll}
                    skipRenderIfItemUnchanged={true}
                    padding={5}

                />
            </RX.View>
        );
    }

    // @ts-ignore
    protected _buildState(props: {}, initialBuild: boolean): Partial<AppState> | undefined {
        const partialState: Partial<AppState> = {};

        partialState.sampleObjects = SampleStore.getSampleObjects().map((sampleObject, i) => {
            return {
                key: i.toString(),
                height: _listItemHeight,
                template: 'sampleObject',
                sampleObject,
            };
        });

        return partialState;
    }

    protected _onPressSampleObject(sample: SampleObject) {
        if (RX.Platform.getType() === 'web') {
            alert(JSON.stringify(sample));
        } else {
            console.log(JSON.stringify(sample));
        }
    }

    private _renderItem = (item: AppListItemInfo, hasFocus?: boolean) => {
        return (
            <AppListItem
                sampleObject={item.sampleObject}
                isSelected={hasFocus === true}
                onPress={this._onPressSampleObject}
            />
        );
    }
}
