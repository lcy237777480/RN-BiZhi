

import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    ListView,
    TouchableOpacity,
    View,
    InteractionManager,
} from 'react-native';

import {ClassAction} from '../actions/ClassificationAction.js';
import Common from '../common/common';
import Loading from '../common/Loading';

let isLoading = true;

class Class extends Component {
    constructor(props) {
        super(props);
        this._renderRow = this.renderRow.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            dispatch(ClassAction(isLoading));
        })
    }
    render() {
        const {Class} = this.props;
        console.log(this.props);
        let classList = Class.ClassDate;

        return (
            <View>
                <View style={styles.header}>
                    <Text style={styles.title}>分类</Text>
                </View>
                {Class.isLoading ? <Loading /> :
                    <ListView
                        dataSource={this.state.dataSource.cloneWithRows(classList) }
                        renderRow={this._renderRow}
                        enableEmptySections={true}
                        initialListSize= {10}
                        style={{ height: Common.window.height - 54 - 64 }}
                        />
                }
            </View>
        );

    }

    renderRow(rowDate) {
        console.log(rowDate);
        return (

            <TouchableOpacity
                activeOpacity={0.75}
                >
                <View style = {styles.container}>
                    <Text>{rowDate.tag_name + ' 共' + rowDate.pin_count + '张'}</Text>
                </View>

            </TouchableOpacity>
        );
    }


}

const styles = StyleSheet.create({

    container: {
        width: Common.window.width,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    header: {
        marginTop: 20,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
    },

});
module.exports = Class;