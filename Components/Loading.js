import React from "react";
import {View, Modal, ActivityIndicator} from 'react-native';

export default function Loading({visible}) {
    return(
        <Modal transparent visible={visible}>
            <View style={{
                flex: 1,
                alignItems:'center',
                justifyContent: 'center',
                opacity: 0.7,
                backgroundColor: 'black'

            }}>
                <ActivityIndicator
                    size={'large'}
                    color={'#F7C724'}
                    animating={true}
                />
            </View>
        </Modal>
    )
}