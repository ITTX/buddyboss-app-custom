import { Alert } from 'react-native';
import PrevNextComponent from './components/PrevNextB';
import LessonBottomComponent from "./components/LessonBottomComponent";
import LessonActionComponent from "./components/LessonActionComponent";
import LearnTopicActionComponent from "./components/LearnTopicActionComponent";
 
export const applyCustomCode = externalCodeSetup => {
	// call custom code api here

	externalCodeSetup.appInitialisationApi.setHomeScreenPrefetchEnabled(true)

	externalCodeSetup.indexJsApi.addIndexJsFunction(() => {
		console.log("LinguaSmart mobile app custom version 0.1");
		window.__lspriv = window.__lspriv || {};
	});

	const menuItems = [{ title: "Informacja dodatkowa", onPress: () => Alert.alert("Telefony nie kutasiki, od trzepania nie rosną.") }];

 	externalCodeSetup.shakeManagerApi.addMenuItems(menuItems)

	externalCodeSetup.lessonSingleScreenApi.setPrevNextComponent(props => <PrevNextComponent {...props} />)
	externalCodeSetup.lessonSingleScreenApi.setLessonActionComponent(props => <LessonActionComponent {...props} />)
	externalCodeSetup.lessonSingleScreenApi.setAfterMaterialsComponent(props => <LessonBottomComponent {...props}/>)

	externalCodeSetup.learnTopicSingleScreenApi.setPrevNextComponent(props => <PrevNextComponent {...props} />)
	externalCodeSetup.learnTopicSingleScreenApi.setLearnTopicActionComponent(props => <LearnTopicActionComponent {...props} />)

};
