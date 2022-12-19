import Rodux from "@rbxts/rodux";
import { skillTreeReducer } from "./Reducers/SkillTreeReducer";

const reducer = Rodux.combineReducers({
	toggleSkillTree: skillTreeReducer,
});

export default reducer;
