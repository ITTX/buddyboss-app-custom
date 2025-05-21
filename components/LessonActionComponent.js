import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

import AuthWrapper from "@src/components/AuthWrapper";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import Icon from "@src/components/Icon";
import { isColorDark } from "@src/utils";

const LessonActionComponent = ({
    showComplete,
    global,
    colors,
    t,
    lesson,
    onCompleteButtonClick,
    completing,
    completeDisabled,
    labels,
    nextObject,
}) => {
    console.log("LessonActionComponent", lesson);

    var _lessonActionCompleteIcon = global.lessonActionCompleteIcon;
    _lessonActionCompleteIcon.tintColor = colors.coursesLabelCompleted;
    _lessonActionCompleteIcon.color = colors.coursesLabelCompleted;
    var lessonImmediatelyCompletable = lesson.topicsCount == 0 && lesson.quizCount == 0 && lesson.completed == false
    return (<AuthWrapper actionOnGuestLogin={"hide"}>
    {showComplete && (
        <View
            style={[
                global.row,
                {
                    backgroundColor: colors.bodyFrontBg,
                    borderTopColor: colors.borderColor
                },
                global.lessonActionButtonContainer
            ]}
        >
            <AppTouchableOpacity
                style={[
                    { flex: 1 },
                    {
                        opacity: !lesson.completed && completeDisabled ? 0.5 : 1,
                        backgroundColor: !lesson.completed
                            ? colors.primaryButtonBg
                            : colors.bodyFrontBg
                    },
                    global.completeLessonButtonW
                ]}
                disabled = {completeDisabled} 
                onPress={() => {
                    if (lessonImmediatelyCompletable) {
                        onCompleteButtonClick()
                        lesson.completed = true
                    }
                    if (lesson.completed) {
                        window.__lspriv.lessonNavigateNext(lesson.id)
                        return
                    }
                    if (window.__lspriv.nextTopicNavigate) {
                        window.__lspriv.nextTopicNavigate()
                        return
                    }
                }}
            >
                <View style={global.row}>
                    <View style={global.linkWithArrow}>
                        {!lesson.completed ? (
                            completing && window.__lspriv.params.completingSpinnerEnabled && (
                                    <ActivityIndicator
                                        animating={true}
                                        color={colors.primaryButtonColor}
                                        size="small"
                                        style={global.lessonButtonLoadingIcon}
                                    />
                            )
                        ) : (
                            <Icon
                                webIcon={""}
                                icon={{fontIconName: "check", weight: 200}}
                                styles={_lessonActionCompleteIcon}
                            />
                        )}
                        <Text
                            style={[
                                {
                                    marginLeft: 10,
                                    color: !lesson.completed
                                        ? colors.primaryButtonColor
                                        : isColorDark(colors.bodyFrontBg)
                                            ? "white"
                                            : "black"
                                },
                                !lesson.completed
                                    ? global.completeLessonButton
                                    : global.completeButton
                            ]}
                        >
                            {t(
                                lesson.completed
                                    ? "lesson:completed"
                                    : ( (lessonImmediatelyCompletable) ? "lesson:completeLesson" : "course:continue"),
                                { label: labels.lesson.toLowerCase() }
                            )}
                        </Text>
                    </View>
                </View>
            </AppTouchableOpacity>
        </View>
    )}
</AuthWrapper>);};

export default LessonActionComponent;
