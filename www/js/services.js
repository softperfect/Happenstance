function Service($rootScope, $http, $ionicPopup,$ionicLoading) {

    var api = {
        website: 'webservice/api/websiteinfo',
        mobileRegister: 'webservice/api/mobileRegister',
        getUser: 'webservice/api/getUser',
        groupList: 'webservice/api/getGroups',
        getContacts: 'webservice/api/getContacts',
        sendInvitation: 'webservice/api/sendInvistation',
        receiveInvitation: 'webservice/api/receiveInvitation',
        acceptInvitation: 'webservice/api/acceptInvitation',
        ignoreInvitation: 'webservice/api/ignoreInvitation',
        getNearByContact: 'webservice/api/getNearByContact',
        getInvitationDetail: 'webservice/api/getInvitationDetail',
        getContactDetail: 'webservice/api/getContactDetail',
        deleteContact: 'webservice/api/deleteContact',
        updateContact: 'webservice/api/updateContact',
        sendMessage: 'webservice/api/sendMessage',
        sendMultiMessage: 'webservice/api/sendMultiMessage',
        replyMessage: 'webservice/api/replyMessage',
        getMessageDetail: 'webservice/api/getMessageDetail',
        getMessageList: 'webservice/api/getMessageList',
        forgotPassword: 'webservice/api/forgotPassword',
        changepassword: 'webservice/api/changePassword',
        updateLocation: 'webservice/api/updateLocation',
        logout: 'webservice/api/logout',
        login: 'webservice/api/login',
        register: 'webservice/api/register',
		insertmobileContactList: 'webservice/api/insertmobileContactList',
		getmobileContactList: 'webservice/api/getmobileContactList',
		getMobileContactDetail: 'webservice/api/getMobileContactDetail',
		updateMobileContact: 'webservice/api/updateMobileContact',
		sendMobileContactInvitation: 'webservice/api/sendMobileContactInvitation',
		searchmobileContactList: 'webservice/api/SearchMobileContactList',
		dellivecontactslist: 'webservice/api/DelLiveContactsList',
		mobileappConfig: 'webservice/api/GetMobileAppConfig',
    }, showError = false;

    $rootScope.service = {
        get: function (key, params, success, error) {

            if (typeof params === 'function') {
                error = success;
                success = params;
                params = null;
            }

            console.log(params);

            var url = Config.baseUrl + api[key];

            $http.get(url, {
                params: params,
                timeout: 20000
            }).then(function (res) {
                success(res.data);
            }, handleError(error));
        },
        post: function (key, params, success, error) {
            if (typeof params === 'function') {
                callback = params;
                params = null;
            }
            var userData = [];
            console.log(params);

            var url = Config.baseUrl + api[key];
            $http.post(url, params).then(function (res) {
                console.log(res.data);

                success(res.data);
            }, handleError(error));
        },
        sendSms: function (params, success, error) {
            if (typeof params === 'function') {
                error = success;
                success = params;
                params = null;
            }

            var url = Config.baseUrl + 'smsapi/SendTemplateSMS.php';
            $http.get(url, {
                params: params
            }).then(function (res) {
                success(res.data);
            }, handleError(error));
        }
    };

    function handleError(error) {
        return function (err) {
            if (error)
                error(err);
            if (showError) {
                return;
            }
            showError = true;
            alert('Network Error\r\n Please check your network connection!');
            $ionicLoading.hide();
             $ionicPopup.alert({
             title: "Network Error",
             template:"Please check your network connection!",
             buttons: [{
             text: "ok",
             onTap: function () {
                 $rootScope.hideLoading();
             showError = false;
             }
             }]
             });
            
        };
    }
}
