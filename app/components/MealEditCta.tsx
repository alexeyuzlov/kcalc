import { Button, Modal, View, } from 'react-native';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { ID } from '../domain/id.ts';
import { MealEdit } from './MealEdit.tsx';
import { MealForm } from '../domain/meal.ts';

type SectionProps = PropsWithChildren<{
    id?: ID;
    newMeal?: MealForm;
}>;

export function MealEditCta({id, newMeal}: SectionProps): React.JSX.Element {
    const [modalVisible, setModalVisible] = useState(false);

    const title = id ? 'Edit Meal' : 'Add Meal';

    useEffect(() => {
        if (newMeal) {
            setModalVisible(true);
        }
    }, [newMeal]);

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
                    <MealEdit id={id} newMeal={newMeal} done={() => setModalVisible(false)}/>
                </Modal>
            }
        </View>
    );
}
