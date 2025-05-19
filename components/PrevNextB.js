import React from "react";
import { Text, View, StyleSheet } from "react-native";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import Icon from "@src/components/Icon";
import { shadeColor } from "@src/utils";

export const onObjectClick = (
   object,
   onQuizClick,
   onTopicClick,
   onLessonClick
) => {
   if (!!!object) {
       return false;
   }
   switch (object.type) {
       case "quiz":
           onQuizClick(object.parentType, object.parent)(object);
           break;
       case "topic":
           onTopicClick(object, object.parent);
           break;
       case "lesson":
           onLessonClick(object);
           break;
   }
};

const PrevNext = ({
   global,
   colors,
   t,
   prevObject,
   nextObject,
   courseId,
   onQuizClick,
   onLessonClick,
   onTopicClick,
   nextLockedAlert
}) => {

   window.__lspriv.objectClick = (object) => {
       onObjectClick(object, onQuizClick, onTopicClick, onLessonClick);
   };

   if (!nextObject && !prevObject) {
       return null;
   }

   return (
       <View style={[global.row]}>
           <AppTouchableOpacity
               style={[
                   global.wrappedButton,
                   global.wrappedTextButton,
                   { marginRight: 4 }
               ]}
               onPress={() => {
                   if (prevObject !== "disabled") {
                       onObjectClick(prevObject, onQuizClick, onTopicClick, onLessonClick);
                   }
               }}
           >
               <View style={global.row}>
                   <View style={global.linkWithArrow}>
                       <Text
                           style={[
                               global.wrappedTextButtonLabel,
                               {
                                   color:
                                       !!!prevObject || prevObject === "disabled"
                                           ? shadeColor(colors.headerIconColor, 0.4)
                                           : colors.headerIconColor
                               }
                           ]}
                       >
                           {"<<<"}
                       </Text>
                   </View>
               </View>
           </AppTouchableOpacity>

           <AppTouchableOpacity
               style={[global.wrappedButton, global.wrappedTextButton]}
               onPress={() => {
                   if (nextObject !== "disabled") {
                       onObjectClick(nextObject, onQuizClick, onTopicClick, onLessonClick);
                   } else if (typeof nextLockedAlert === "function") {
                       nextLockedAlert();
                   }
               }}
           >
               <View style={global.row}>
                   <View style={global.linkWithArrow}>
                       <Text
                           style={[
                               global.wrappedTextButtonLabel,
                               {
                                   color:
                                       !!!nextObject || nextObject === "disabled"
                                           ? shadeColor(colors.headerIconColor, 0.4)
                                           : colors.headerIconColor
                               }
                           ]}
                       >
                           {">>>"}
                       </Text>
                   </View>
               </View>
           </AppTouchableOpacity>
       </View>
   );
};

export default PrevNext;
