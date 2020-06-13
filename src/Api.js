import {VKMiniAppAPI} from "@vkontakte/vk-mini-apps-api";

class Api {
    vkApi: VKMiniAppAPI;
    idApp: number;


    constructor(id: number) {
        this.vkApi = new VKMiniAppAPI()

        this.vkApi.initApp()
        this.idApp = id
    }
}

export default Api;

