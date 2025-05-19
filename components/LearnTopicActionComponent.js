import React from "react";
import AuthWrapper from "@src/components/AuthWrapper";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import Icon from "@src/components/Icon";
import { isColorDark } from "@src/utils";
import { NavigationActions } from "react-navigation";
import { View, Text, ActivityIndicator } from "react-native";

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
  return (
  <AuthWrapper actionOnGuestLogin={"hide"}>
    {showComplete && (
      <View
        style={[
          global.row,
          {
            backgroundColor: colors.bodyFrontBg,
            borderTopColor: colors.borderColor
          },
          global.learnTopicActionButtonContainer
        ]}
      >
        <AppTouchableOpacity
          style={[
            {flex: 1},
            {
              opacity: !topicVM.completed && completeDisabled ? 0.5 : 1,
              backgroundColor: !topicVM.completed
                ? colors.primaryButtonBg
                : colors.bodyFrontBg
            },
            global.completeTopicButtonW
          ]}
          disabled={false}
          onPress={() => {
            if (!(topicVM.completed || completeDisabled)) {
              onCompleteTopicClick()
            }
            if (nextObject) {
              window.__lspriv.objectClick(nextObject);
            }
          }}
        >
          <View style={global.row}>
            <View style={global.linkWithArrow}>
              {!topicVM.completed ? (
                completing && (
                  <ActivityIndicator
                    animating={true}
                    color={colors.primaryButtonColor}
                    size="small"
                    style={global.learnTopicButtonLoadingIcon}
                  />
                )
              ) : (
                <Icon
                  webIcon={""}
                  icon={{fontIconName: "check", weight: 200}}
                  styles={global.learnTopicActionCompleteIcon}
                />
              )}
              <Text
                style={[
                  {
                    marginLeft: 10,
                    color: !topicVM.completed
                      ? colors.primaryButtonColor
                      : isColorDark(colors.bodyFrontBg)
                        ? "white"
                        : "black"
                  },
                  global.completeTopicButton
                ]}
              >
                {t(
                  topicVM.completed
                    ? "lessonTopic:completed"
                    : "lessonTopic:markAsComplete"
                ) + (
                    topicVM.completed
                        ? " >>>"
                        : ""
                )}
              </Text>
            </View>
          </View>
        </AppTouchableOpacity>
      </View>
    )}
  </AuthWrapper>
);};

export default LearnTopicActionComponent;
