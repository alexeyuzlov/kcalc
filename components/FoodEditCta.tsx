import { Button, Modal, View, } from 'react-native';
import React, { PropsWithChildren, useState } from 'react';
import { ID } from '../domain/id.ts';
import { FoodEdit } from './FoodEdit.tsx';

type SectionProps = PropsWithChildren<{
    id?: ID;
}>;

export function FoodEditCta({id}: SectionProps): React.JSX.Element {
    const [modalVisible, setModalVisible] = useState(false);

    const title = id ? 'Edit Food' : 'Add Food';

    return (
        <View>
            <Button
                onPress={() => setModalVisible(true)}
                title={title}
            />

            {modalVisible &&
                <Modal
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <FoodEdit id={id} done={() => setModalVisible(false)}/>
                </Modal>
            }
        </View>
    );
}

