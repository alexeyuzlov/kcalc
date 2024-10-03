import { Button, Modal, View, } from 'react-native';
import React, { PropsWithChildren, useState } from 'react';
import { ID } from '../domain/id.ts';
import { MealEdit } from './MealEdit.tsx';

type SectionProps = PropsWithChildren<{
    id?: ID;
}>;

export function MealEditCta({id}: SectionProps): React.JSX.Element {
    const [modalVisible, setModalVisible] = useState(false);

    const title = id ? 'Edit Meal' : 'Add Meal';

    return (
        <View>
            <Button
                onPress={() => setModalVisible(true)}
                title={title}
            />

            {
                modalVisible &&
                <Modal
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <MealEdit id={id} done={() => setModalVisible(false)}/>
                </Modal>
            }
        </View>
    );
}

