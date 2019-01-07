import React from 'react';
import RX from 'reactxp';
import {SampleObject} from '../models/SampleObject';
import {ComponentBase} from 'resub';
import SampleStore from '../stores/SampleStore';

import {VirtualListView, VirtualListViewItemInfo} from 'reactxp-virtuallistview';
import AppListItem from './AppListItem';
import {Colors} from '../app/Styles';

interface AppListItemInfo extends VirtualListViewItemInfo {
    sampleObject: SampleObject;
}

interface ListState {
    sampleObjects: AppListItemInfo[];
    selectedItem?: SampleObject;
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

const _listItemHeight = 36;

export class SampleList extends ComponentBase<{}, ListState> {

    // , renderItem: (item: AppListItemInfo, hasFocus?: boolean) => any
    constructor(props: {}) {
        super(props);
        this._renderItem = this._renderItem.bind(this);
        this._onPressSampleObject = this._onPressSampleObject.bind(this);
    }

    public render() {
        return (
            <RX.View useSafeInsets={true} style={_styles.container}>
                <RX.Text>
                    {JSON.stringify(this.state.selectedItem)}
                </RX.Text>
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
    protected _buildState(props: {}, initialBuild: boolean): Partial<ListState> | undefined {
        const partialState: Partial<ListState> = {};

        partialState.sampleObjects = SampleStore.getAll().map((sampleObject) => {
            return {
                key: sampleObject.id.toString(),
                height: _listItemHeight,
                template: 'sampleObject',
                sampleObject,
            };
        });

        partialState.selectedItem = SampleStore.getSelected();

        return partialState;
    }

    protected _onPressSampleObject(sample: SampleObject) {
        const s: SampleObject[] = [];
        for (let i = 0; i < 20; i++) {
            s.push({id: sample.id + i + 1, text: 'manual Insertion' + (sample.id + i + 1)});
        }

        // select clicked item
        SampleStore.select(sample.id);

        SampleStore.addAll(s);

        // SampleStore.addAll([{id: sample.id + 1, text: 'manual Insertion' + (sample.id + 1)}]);
        // if (RX.Platform.getType() === 'web') {
        //     if (this.state.selectedItem) {
        //         alert(JSON.stringify(this.state.selectedItem));
        //     }
        // } else {
        //     //@ts-ignore
        //     console.log(JSON.stringify(sample));
        // }
    }

    private _renderItem = (item: AppListItemInfo, hasFocus?: boolean) => {
        return (
            <AppListItem
                sampleObject={item.sampleObject}
                isSelected={hasFocus === true}
                onPress={this._onPressSampleObject}/>
        );
    }
}
