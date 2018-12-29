import RX from 'reactxp';
import {ComponentBase} from 'resub';
import {SampleObject} from './models/SampleObject';
import * as React from 'react';
import HoverButton from './controls/HoverButton';
import {Colors, FontSizes} from './app/Styles';

interface AppListItemProps extends RX.CommonProps {
    sampleObject: SampleObject;
    isSelected: boolean;
    onPress: (todo: SampleObject) => void;
}

const _itemBorderWidth = 1;

const _styles = {
    container: RX.Styles.createButtonStyle({
        alignSelf: 'stretch',
        borderBottomWidth: _itemBorderWidth,
        borderColor: Colors.borderSeparatorLight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Colors.white,
    }),
    todoNameText: RX.Styles.createTextStyle({
        flex: -1,
        fontSize: FontSizes.size16,
        // font: Fonts.displayRegular,
        color: Colors.menuText,
        margin: 8,
    }),
    todoNameTextSelected: RX.Styles.createTextStyle({
        // font: Fonts.displaySemibold,
        color: Colors.menuTextSelected,
    }),
    todoImage: RX.Styles.createImageStyle({
        marginLeft: 16,
        marginRight: 4,
        height: 20,
        width: 24,
    }),
    hovering: RX.Styles.createButtonStyle({
        backgroundColor: Colors.listItemHover,
    }),
    selected: RX.Styles.createButtonStyle({
        backgroundColor: Colors.listItemSelected,
    }),
};

export default class AppListItem extends ComponentBase<AppListItemProps, {}> {

    public render(): JSX.Element | null {
        return (
            <HoverButton onPress={this._onPress} onRenderChild={this._onRenderItem}/>
        );
    }

    private _onPress = (e: RX.Types.SyntheticEvent) => {
        e.stopPropagation();

        this.props.onPress(this.props.sampleObject);
    }

    private _onRenderItem = (isHovering: boolean) => {
        const buttonStyles = [_styles.container];
        if (this.props.isSelected) {
            buttonStyles.push(_styles.selected);
        } else if (isHovering) {
            buttonStyles.push(_styles.hovering);
        }

        let nameText: JSX.Element;

        nameText = (
            <RX.Text style={_styles.todoNameText} numberOfLines={1}>
                {this.props.sampleObject.text}
            </RX.Text>
        );

        return (
            <RX.View style={buttonStyles}>
                {nameText}
            </RX.View>
        );
    }

}
