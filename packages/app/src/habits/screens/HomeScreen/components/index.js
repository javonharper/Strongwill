import React, { Component } from 'react';
import {
  ActionSheetIOS,
  ScrollView,
  SectionList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { wrap, options } from 'react-native-style-tachyons';
import Icon from 'react-native-vector-icons/Feather';
import { get, groupBy, map, noop, findIndex, times } from 'lodash';
import moment from 'moment';
import {
  formatProgress,
  habitWithCompletions,
  titleCase
} from '../../../../utils';
import { logCompletion, deleteHabit } from '../../../../habits';

export const Heading = wrap(() => (
  <View cls="mb3">
    <Text style={{ fontSize: 13 }} cls="b black-60">
      YOU CAN DO THIS
    </Text>
    <Text cls="fw9 black f2">Habits</Text>
  </View>
));

export const SectionHeader = wrap(({ children }) => (
  <View cls="bg-white-80">
    <Text cls="f3 fw9 mb2 black ">{titleCase(children)}</Text>
  </View>
));

export const SectionSpacing = wrap(() => <View cls="bg-red mb3" />);

const PunchedHole = wrap(() => (
  <View cls="mr3">
    <View cls="bg-white ba b--white h2 w2 br5"> </View>
  </View>
));

const UnpunchedHole = wrap(() => (
  <View cls="mr3">
    <View cls="bg-white-50 ba b--white-80 h2 w2 br5"> </View>
  </View>
));

export const HabitItem = wrap(
  class extends Component {
    render() {
      const { habit, navigation, onPress, onLongPress } = this.props;
      const completions = get(habit, 'completions', []);

      return (
        <TouchableOpacity
          cls="pa3 mv2 br3 ba b--black-10"
          onPress={onPress}
          onLongPress={onLongPress}
          style={{
            backgroundColor: habit.color,
            shadowOpacity: 0.5,
            shadowRadius: 2,
            shadowColor: '#CCCCCC',
            shadowOffset: { height: 5, width: 0 }
          }}
        >
          <View>
            <View cls="flx-row mb3">
              {times(habit.goal).map(
                i =>
                  i < completions.length ? (
                    <PunchedHole key={i} />
                  ) : (
                    <UnpunchedHole key={i} />
                  )
              )}
            </View>
            <Text cls="white f4 mb2 fw6">{habit.name}</Text>
            <Text cls="white-90 f5 fw7">
              {habit.completions.length} of {habit.goal} times{' '}
              {formatProgress(habit.frequency)}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
);

export const AddHabitButton = wrap(({ navigation }) => (
  <TouchableOpacity
    style={{ borderWidth: 5, borderRadius: 900 }}
    cls="b--black"
    onPress={() => navigation.navigate('Create')}
  >
    <View cls="">
      <Icon
        cls="pa3"
        name="plus"
        size={30}
        color={options.colors.palette.black}
      />
    </View>
  </TouchableOpacity>
));
