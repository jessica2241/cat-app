import axios from "axios-jsonp-pro";

class VkApi {
    arr: Map;

    constructor(token: string) {
        this.token = token
    }


    async request(method: string, params = '') {
        //
        // var str: string = ''
        //  for (let [key, value] of params.entries()) {
        //         str += '&'+key+'='+value
        //  }https://api.vk.com/method/docs.getUploadServer?type=graffiti&group_id=194461517&v=5.103&access_token=pp

        let urlFriends = 'https://api.vk.com/method/' + method + '?' +
            '&access_token=' + this.token +
            '&' + params +
            '&v=5.103';

        let friends = await axios.jsonp(urlFriends)

        return friends
    }

    doAjaxPost(url: string) {
        var formData = new FormData();


        axios.get('https://psv4.userapi.com/c848128/u589567154/docs/d9/ca213b5b6712/58.png')
            .then(function (response) {
                // handle success
                console.log(response);

        formData.append("file", response.data);

        axios({

            method: 'POST',
            url: url,
            data: formData,
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (response) {
                console.log(response);
            });
    })
}

    getUploadUrl() {
        return this.request('docs.getUploadServer', 'type=graffiti&group_id=194461517')

    }



    docs_add(ownerId, docId, accessKey, captcha_sid = undefined, captcha_key = undefined) {

        if (captcha_sid === undefined) {
            return this.request('docs.add',
                'owner_id=' + ownerId +
                '&doc_id=' + docId +
                '&access_key=' + accessKey
            )
        } else {
            return this.request('docs.add',
                'owner_id=' + ownerId +
                '&doc_id=' + docId +
                '&access_key=' + accessKey+
                '&captcha_key=' + captcha_key+
                '&captcha_sid=' + captcha_sid
            )
        }
    }
}

export default VkApi;