import React, { useState, useRef } from "react";
import AuthWrapper from "@src/components/AuthWrapper";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import Icon from "@src/components/Icon";
import { isColorDark } from "@src/utils";
import { View, Text, ActivityIndicator, Animated } from "react-native";

const AnimatedTouchable = Animated.createAnimatedComponent(AppTouchableOpacity);

const LearnTopicActionComponent = ({
  showComplete,
  global,
  colors,
  t,
  topicVM,
  onCompleteTopicClick,
  completing,
  completeDisabled,
  nextObject,
}) => {

  // 1) local completed flag
  const [localCompleted, setLocalCompleted] = useState(topicVM.completed);

  // 2) two animated values: one for background‐color, one for icon opacity
  const bgAnim = useRef(
    new Animated.Value(localCompleted ? 1 : 0)
  ).current;
  const iconAnim = useRef(
    new Animated.Value(localCompleted ? 1 : 0)
  ).current;

  // tint the icon style once
  const _learnTopicActionCompleteIcon = {
    ...global.learnTopicActionCompleteIcon,
    tintColor: colors.coursesLabelCompleted,
    color: colors.coursesLabelCompleted,
  };

  const handlePress = () => {
    if (localCompleted) {
      if (nextObject) {
        window.__lspriv.objectClick(nextObject)
      }
    }

    if (localCompleted || completeDisabled) return;

    // 1) flip our local flag
    setLocalCompleted(true);

    // 2) fire the "mark as complete" callback in background
    onCompleteTopicClick();

    // 3) animate BG color & icon fade-in in parallel
    Animated.parallel([
      Animated.timing(bgAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,       // backgroundColor interpolation must be non-native
      }),
      Animated.timing(iconAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,        // opacity can be native
      }),
    ]).start(() => {
      // 4) after animation, wait then navigate
      setTimeout(() => {
        if (nextObject) {
          window.__lspriv.objectClick(nextObject);
        }
      }, 200);
    });
  };

  // interpolate the background between "primaryButtonBg" → "bodyFrontBg"
  const interpolatedBG = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.primaryButtonBg, colors.bodyFrontBg],
  });

  // the text color also flips when completed
  const textColor = localCompleted
    ? (isColorDark(colors.bodyFrontBg) ? "white" : "black")
    : colors.primaryButtonColor;

  return (
    <AuthWrapper actionOnGuestLogin="hide">
      {showComplete && (
        <View
          style={[
            global.row,
            {
              backgroundColor: colors.bodyFrontBg,
              borderTopColor: colors.borderColor,
            },
            global.learnTopicActionButtonContainer,
          ]}
        >
          <AnimatedTouchable
            style={[
              { flex: 1, opacity: completeDisabled ? 0.5 : 1 },
              { backgroundColor: interpolatedBG },
              global.completeTopicButtonW,
            ]}
            disabled={completeDisabled}
            onPress={handlePress}
          >
            <View style={global.row}>
              <View style={global.linkWithArrow}>
                {/** loading spinner (only before we flip) **/}
                {!localCompleted && completing && (
                  <ActivityIndicator
                    animating
                    color={colors.primaryButtonColor}
                    size="small"
                    style={global.learnTopicButtonLoadingIcon}
                  />
                )}

                {/** check icon, wrapped in an Animated.View to drive opacity **/}
                <Animated.View style={{ opacity: iconAnim }}>
                  {localCompleted && (
                    <Icon
                      webIcon=""
                      icon={{ fontIconName: "check", weight: 200 }}
                      styles={_learnTopicActionCompleteIcon}
                    />
                  )}
                </Animated.View>

                <Text
                  style={[
                    { marginLeft: 10, color: textColor },
                    global.completeTopicButton,
                  ]}
                >
                  {t(
                    localCompleted
                      ? "lessonTopic:completed"
                      : "lessonTopic:markAsComplete"
                  )}
                </Text>
              </View>
            </View>
          </AnimatedTouchable>
        </View>
      )}
    </AuthWrapper>
  );
};

export default LearnTopicActionComponent;
