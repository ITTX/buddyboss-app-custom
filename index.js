import { Alert } from 'react-native';
import { Platform } from 'react-native';
import PrevNextComponent from './components/PrevNextB';
import CourseActionButtons from './components/CourseActionButtons';
import LessonBottomComponent from "./components/LessonBottomComponent";
import LessonActionComponent from "./components/LessonActionComponent";
import LessonContentComponent from './components/LessonContentComponent';
import LearnTopicActionComponent from "./components/LearnTopicActionComponent";

import * as Clarity from '@microsoft/react-native-clarity'; 

const linguaSmartVersionInfo = {
		version: "0.1.2",
		name: "LinguaSmart Custom Version",
		description: "Custom version of LinguaSmart mobile app.",
		descriptionString: () => {
			return `${linguaSmartVersionInfo.description} version ${linguaSmartVersionInfo.version}`;
		}
}

export const applyCustomCode = externalCodeSetup => {
	// call custom code api here

	externalCodeSetup.appInitialisationApi.setHomeScreenPrefetchEnabled(true)

	externalCodeSetup.indexJsApi.addIndexJsFunction(() => {
		// log version info
		console.log(linguaSmartVersionInfo.descriptionString());
		// prepare the custom code params
		window.__lspriv = window.__lspriv || {};
		window.__lspriv.params = window.__lspriv.params || {};
		window.__lspriv.params.customCode = {
			linguaSmartVersionInfo: linguaSmartVersionInfo
		};
		window.__lspriv.params.completingSpinnerEnabled = false;
		// initialize clarity code
		console.log("Initializing Clarity");
		Clarity.initialize('pchrmrr3vi', { 
			logLevel: Clarity.LogLevel.Verbose, // Note: Use "LogLevel.Verbose" value while testing to debug initialization issues.
		});
	});

	// custom shake menu for version info
	const menuItems = [{ 
		title: linguaSmartVersionInfo.name, 
		onPress: () => Alert.alert(linguaSmartVersionInfo.descriptionString()) 
	}];
 	externalCodeSetup.shakeManagerApi.addMenuItems(menuItems)

	//////////////////////////////////////////////////////////////////////////////////
	// potentially addressing the issues captured on 13.06.2025 on Android devices
	// - ekran zawartość kursu - guzik za nisko 
	// - lekcja - guzik za nisko
	// - zadanie - guzik za nisko
	// - quiz
	// 	 - rozpocznij quiz - OK
	// 	 - następna - OK
	// 	 - zakończ - OK
	var platformOffset = 0;
	if (Platform.OS === 'android') {
		platformOffset = 20; // Android system buttons bottom bar spacing
	}
	//////////////////////////////////////////////////////////////////////////////////

	// styles update
	externalCodeSetup.cssApi.addGlobalStyle("lessonActionButtonContainer", {
		paddingTop: 6,
		paddingBottom: 6,
		paddingVertical: null,
		marginBottom: -20 + platformOffset,
		marginTop: 0,
	}, false);
	externalCodeSetup.cssApi.addGlobalStyle("learnTopicActionButtonContainer", {
		paddingTop: 6,
		paddingBottom: 6,
		paddingVertical: null,
		marginBottom: -20 + platformOffset,
		marginTop: 0,
	}, false);
	externalCodeSetup.cssApi.addGlobalStyle("quizStartButtonContainer", {
		paddingTop: 6,
		paddingBottom: 18,
		paddingVertical: null,
		marginBottom: 0,
		marginTop: 0,
	}, false);
	externalCodeSetup.cssApi.addGlobalStyle("quizResultButtonContainer", {
		paddingTop: 6,
		paddingBottom: 18,
		paddingVertical: null,
		marginBottom: 0,
		marginTop: 0,
	}, false);
	externalCodeSetup.cssApi.addGlobalStyle("quizSubmitButtonContainer", {
		paddingTop: 6,
		paddingBottom: 18,
		paddingVertical: null,
		marginBottom: 0,
		marginTop: 0,
	}, false);
	externalCodeSetup.cssApi.addGlobalStyle("courseActionButtonContainer", {
		paddingHorizontal: 15,
		paddingBottom: 6,
		paddingTop: 6,
		marginTop: 0,
		marginBottom: -20 + platformOffset,
		paddingVertical: null,
        zIndex: 1,
		borderTopWidth: 1/3,
	}, false);

	// update the prev/next component on lessons, quizzes and learn topics
	externalCodeSetup.quizApi.setPrevNextComponent((props) => <PrevNextComponent {...props} />);
	externalCodeSetup.lessonSingleScreenApi.setPrevNextComponent(props => <PrevNextComponent {...props} />)
	externalCodeSetup.learnTopicSingleScreenApi.setPrevNextComponent(props => <PrevNextComponent {...props} />)

	// manage lesson navigation
	externalCodeSetup.lessonSingleScreenApi.setLessonActionComponent(props => <LessonActionComponent {...props} />)
	externalCodeSetup.lessonSingleScreenApi.setAfterMaterialsComponent(props => <LessonBottomComponent {...props}/>)
	externalCodeSetup.lessonSingleScreenApi.setLessonContentComponent(props => <LessonContentComponent {...props} />)

	// manage learn topic navigation
	externalCodeSetup.learnTopicSingleScreenApi.setLearnTopicActionComponent(props => <LearnTopicActionComponent {...props} />)

	// course bottom navigation transform
	externalCodeSetup.courseSingleApi.setTransformCourseActionButtons(CourseActionButtons)
};
