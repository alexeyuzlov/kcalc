import React, { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import { Food } from '../domain/food.ts';
import { Number } from './Number.tsx';
import { layoutStyles } from '../styles/layout.tsx';

type Props = PropsWithChildren<{
    item: Food;
}>;

export function FoodInfo({item}: Props): React.JSX.Element {
    return (
        <View>
            <View style={{...layoutStyles.row, gap: 4}}>
                <Number value={item.protein} />
                <Text>/</Text>
                <Number value={item.fat} />
                <Text>/</Text>
                <Number value={item.carbs} />

                <View style={layoutStyles.spacer}/>

                <Number value={item.weight}>grams</Number>
            </View>

            <View style={{...layoutStyles.row, gap: 0}}>
                <Text>Fiber: </Text>
                <Number value={item.fiber || 0} />

                <Text> / </Text>

                <Text>Salt: </Text>
                <Number value={item.salt || 0} />

                <View style={layoutStyles.spacer}/>
            </View>
        </View>

    );
}
