import { Service, OnStart, OnInit } from "@flamework/core";
import { Players, CollectionService } from "@rbxts/services";
@Service({})
export class PlayerInitialize implements OnStart, OnInit {
	onInit() {}

	onStart(): void {
		Players.PlayerAdded.Connect((Player: Player) => {
			CollectionService.AddTag(Player, "Player_Tag");
			this.playerAdded(Player);
		});
	}
	playerAdded(Player: Player) {
		print(`${Player.Name} has joined the server!`);
	}
}
