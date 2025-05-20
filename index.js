import { Alert } from 'react-native';
import PrevNextComponent from './components/PrevNextB';
import LessonBottomComponent from "./components/LessonBottomComponent";
import LessonActionComponent from "./components/LessonActionComponent";
import LearnTopicActionComponent from "./components/LearnTopicActionComponent";

const linguaSmartVersionInfo = {
		version: "0.1",
		name: "LinguaSmart Custom Version",
		description: "Custom version of LinguaSmart mobile app.",
		descriptionString: () => {
			return `${linguaSmartVersionInfo.description} v:${linguaSmartVersionInfo.version}`;
		}
}

export const applyCustomCode = externalCodeSetup => {
	// call custom code api here

	externalCodeSetup.appInitialisationApi.setHomeScreenPrefetchEnabled(true)

	externalCodeSetup.indexJsApi.addIndexJsFunction(() => {
		console.log(linguaSmartVersionInfo.descriptionString());
		window.__lspriv = window.__lspriv || {};
	});

	const menuItems = [{ 
		title: linguaSmartVersionInfo.name, 
		onPress: () => Alert.alert(linguaSmartVersionInfo.descriptionString()) 
	}];
 	externalCodeSetup.shakeManagerApi.addMenuItems(menuItems)

	// update the prev/next component on lessons, quizzes and learn topics
	externalCodeSetup.quizApi.setPrevNextComponent((props) => <PrevNextComponent {...props} />);
	externalCodeSetup.lessonSingleScreenApi.setPrevNextComponent(props => <PrevNextComponent {...props} />)
	externalCodeSetup.learnTopicSingleScreenApi.setPrevNextComponent(props => <PrevNextComponent {...props} />)

	// manage lesson navigation
	externalCodeSetup.lessonSingleScreenApi.setLessonActionComponent(props => <LessonActionComponent {...props} />)
	externalCodeSetup.lessonSingleScreenApi.setAfterMaterialsComponent(props => <LessonBottomComponent {...props}/>)

	// manage learn topic navigation
	externalCodeSetup.learnTopicSingleScreenApi.setLearnTopicActionComponent(props => <LearnTopicActionComponent {...props} />)

};
