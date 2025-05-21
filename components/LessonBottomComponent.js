const LessonBottomComponent = props => {

    const {
        colors,
        course,
        navigation
    } = props;

    const lessonNavigateNext = (lessonId) => {
        var lesson = null;
        var nextLesson = null;
        var llist = [];
        for (let i = 0; i < course.lessons.length; i++) {
            course.lessons[i].lessons_list.map((lesson) => {
                llist.push(lesson);
            });
        }
        for (let i = 0; i < llist.length; i++) {
            if (llist[i] === lessonId) {
                lesson = llist[i];
                if (i + 1 < llist.length) {
                    nextLesson = llist[i + 1];
                }
            }
        }
        if (nextLesson == null) {
            navigation.navigate({
                routeName: "CoursesSingleScreen",
                params: {
                    id: course.id,
                    course
                },
                key: course.id.toString()
            })
        } else {
            navigation.setParams(
                {
                    courseId: course.id,
                    lessonId: nextLesson,
                    lesson: {
                        id: nextLesson,
                        lesson_id: nextLesson,
                    },
                    courseRouteName: "CoursesSingleScreen"
                }
            )
        }
    }
    window.__lspriv.lessonNavigateNext = lessonNavigateNext;

    return null;

}

export default LessonBottomComponent;
