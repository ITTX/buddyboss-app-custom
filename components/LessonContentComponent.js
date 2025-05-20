import { LessonContent, LessonContentComponent } from "@src/containers/LessonSingleScreen"
import { View, Text } from "react-native";

const mLessonContentComponent = props => {
    const {
        isShowingOpenCourseForGuestUser,
        global,
        colors,
        t,
        topics,
        onTopicPressed,
        quizzes,
        navigateToQuiz,
        videoWatchedIfLessonHasVideo,
        courseId,
        lessonId,
        navigation,
        title,
        styles
    } = props;

    var mtopicId = null;
    window.__lspriv.nextTopicNavigate = null;

    topics.map((topic) => {
        if (mtopicId == null && !topic.completed) {
            const mtopic = topic
            mtopicId = mtopic.id
            window.__lspriv.nextTopicNavigate = () => {
                window.__lspriv.nextTopicNavigate = null;
                mtopic.type = "topic"
                mtopic.parent = mtopic.lesson
                window.__lspriv.objectClick(mtopic)
            }
        }
    })
    if (window.__lspriv.nextTopicNavigate == null && quizzes != null) {
        quizzes.map((quiz) => {
            if (mtopicId == null && !quiz.completed) {
                const mtopic = quiz
                mtopicId = mtopic.id
                window.__lspriv.nextTopicNavigate = () => {
                    window.__lspriv.nextTopicNavigate = null;
                    mtopic.type = "quiz"
                    mtopic.parent = mtopic.lesson
                    mtopic.parentType = "lesson"
                    window.__lspriv.objectClick(mtopic)
                }
            }
        })
    }

    const topicSortingFunction = (topics) => {
        if (topics == null) {
            return []
        }
        // sort by topic.title.rendered object, string, natural string sort considering numbers
        topics.sort((a, b) => a.title.rendered.localeCompare(b.title.rendered, undefined, { numeric: true, sensitivity: 'base' }));
        return topics;
    }

    return (
        <View style={styles.container}>
            <View style={{...global.courseRoundBox}}>
                <LessonContent
                         {...{
                             global,
                             colors,
                             t,
                             topics: topicSortingFunction(topics),
                             isShowingOpenCourseForGuestUser,
                         }}
                         quizzes={quizzes}
                         navigateToQuiz={navigateToQuiz}
                         onTopicPressed={onTopicPressed}
                         videoWatchedIfLessonHasVideo={videoWatchedIfLessonHasVideo}
                         courseId={courseId}
                         lessonId={lessonId}
                         navigation={navigation}
                />
            </View>
        </View>
    );
};

export default mLessonContentComponent;