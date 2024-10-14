import {Alert, Button, Share} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {useAppSelector} from '../domain/hooks.ts';
import {food, meal} from '../store.ts';

type SectionProps = PropsWithChildren<{}>;

export function ExportFile({}: SectionProps): React.JSX.Element {
  const mealState = useAppSelector(meal);
  const foodState = useAppSelector(food);

  const exportFile = async () => {
    try {
      const result = await Share.share({
        message: JSON.stringify({
          meal: mealState,
          food: foodState,
        }),
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return <Button title={'Save'} onPress={exportFile} />;
}
