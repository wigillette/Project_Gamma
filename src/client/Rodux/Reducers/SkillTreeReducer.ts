import Rodux from "@rbxts/rodux";

// Handles the state of the skill tree UI; toggle
export interface skillTreeState {
	toggle: boolean;
}

export const INITIAL_STATE = { toggle: false };

export const skillTreeReducer = Rodux.createReducer(INITIAL_STATE, {
	toggleSkillTree: (state: skillTreeState) => {
		// Toggle the Skill Tree view
		return { toggle: !state.toggle };
	},
});
