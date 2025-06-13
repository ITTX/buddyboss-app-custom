import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

const CourseActionButtons = (
    CourseActionBtn,
    course,
    t,
    colors,
    global,
    products,
    navigation,
    startCourse,
    continueCourse,
    priceComponentRender) => 

    {   
        const styledBtn = React.cloneElement(
            CourseActionBtn,
            {
            style: [
                CourseActionBtn.props.style,
                global.courseActionButtonContainer,
            ],
            }
        );
        return styledBtn;
    }

export default CourseActionButtons;