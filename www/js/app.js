// Ionic Starter App
// 'app' is the name of this angular module (also set in a <body> attribute in index.html)
angular.module('app', [
    'ionic', 'ngCordova', 'pascalprecht.translate',
    'app.controllers', 'app.filters', 'ionicLazyLoad', 'slickCarousel'
])

        .run(function ($ionicPlatform, $rootScope, $http, $ionicPopup, $ionicHistory, $cordovaDevice, $cordovaSplashscreen) {


            $ionicPlatform.ready(function ()
            {
                
				var admobid = {};
				//  if( /(android)/i.test(navigator.userAgent) ) { // for android & amazon-fireos
				//	admobid = {
				//	  banner: 'ca-app-pub-7844737046957946/9216355879', // or DFP format "/6253334/dfp_example_ad"
				//	  interstitial: 'ca-app-pub-7844737046957946/5278703180'
				//	};
				//  } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
				//	admobid = {
				//	  banner: 'ca-app-pub-7844737046957946/8690978005', // or DFP format "/6253334/dfp_example_ad"
				//	  interstitial: 'ca-app-pub-7844737046957946/5278703180'
				//	};
				//  } else { // for windows phone
				//	admobid = {
				//	  banner: 'ca-app-pub-xxx/zzz', // or DFP format "/6253334/dfp_example_ad"
				//	  interstitial: 'ca-app-pub-xxx/kkk'
				//	};
				//  }
				
				//if(AdMob) AdMob.createBanner({
				//license: "kenny_blair56@hotmail.com/3c1c06114a9666053fc3cf7f741949d2",
				//adId: admobid.banner,
				//position: AdMob.AD_POSITION.BOTTOM_CENTER,
				//autoShow: true });
				
				//// preppare and load ad resource in background, e.g. at begining of game level
				//if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );
				
				//// show the interstitial later, e.g. at end of game level
				//if(AdMob) AdMob.showInterstitial();
				
				alert("loading " + device.platform);
                $rootScope.$apply(function () {

                    var device = $cordovaDevice.getDevice();
                    $rootScope.manufacturer = device.manufacturer;
                    $rootScope.model = device.model;
                    $rootScope.platform = device.platform;
                    $rootScope.uuid = device.uuid;
                    var type = 0;
                    if (device.platform === "ios")
                    {
                        type = 1;
                    }
                    $rootScope.service.post('mobileRegister', {device_id: device.uuid, device_type: type}, function (res) {
                        //console.log(res)
                    });
                });


                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
				
            });
            $rootScope.backHome = function () {

            }

            Service($rootScope, $http, $ionicPopup);
        })
        .constant("Config", {
            "WebUrl": "http://localhost/code/happenstance/",
            "AppName": "Happenspances",
            "AndroidAppUrl": "https://play.google.com/store/apps/details?id=com.myspecialgames.advanced2048game",
            "ErrorMessage": "End of results"
        })
        // config contact
        .constant("ConfigContact", {
            "EmailId": "weblogtemplatesnet@gmail.com",
            "ContactSubject": "Contact"
        })
        // config admon
        .constant("Configadmob", {
            "interstitial": "ca-app-pub-3940256099942544/6300978111",
            "banner": "ca-app-pub-3940256099942544/1033173712"
        })
        // color variations
        .constant("Color", {
            "AppColor": "light", //light, stable, positive, calm, balanced, energized, assertive, royal, dark
        })
        // push notification
        .constant("PushNoti", {
            "senderID": "871704003795",
        })
        .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $translateProvider, $provide) {
            $ionicConfigProvider.backButton.text('').icon('ion-chevron-left');
            $ionicConfigProvider.scrolling.jsScrolling(false);
            $ionicConfigProvider.tabs.position('bottom');
            $ionicConfigProvider.form.checkbox('square');
            $ionicConfigProvider.views.transition('none');  //('fade-in')
            $provide.decorator('$state', function ($delegate, $stateParams) {
                $delegate.forceReload = function () {
                    return $delegate.go($delegate.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                };
                return $delegate;
            });
            $stateProvider
                    .state('app', {
                        url: '/app',
                        abstract: true,
                        templateUrl: 'templates/menu.html',
                        controller: 'AppCtrl'
                    })
                    .state('app.home', {
                        cache: false,
                        url: '/home', //首页
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/templates/home.html',
                                controller: 'HomeCtrl'
                            }
                        }
                    })
                    .state('app.lists', {
                        url: '/lists/:cmd',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/lists.html',
                                controller: 'ListsCtrl'
                            }
                        }
                    })
                    .state('app.certDownload', {
                        url: '/certDownload', //�?书下载，其实就是内容管�?�
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/certDownload.html',
                                controller: 'certCtrl'
                            }
                        }
                    })
                    .state('app.searchAgent', {
                        url: '/searchAgent', //附近�?销商
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/searchAgent.html',
                                controller: 'SearchAgentCtrl'
                            }
                        }
                    })
                    .state('app.agents', {
                        url: '/agents', //附近�?销商列表
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/agents.html',
                                controller: 'AgentsCtrl'
                            }
                        }
                    })
                    .state('app.survey', {
                        url: '/survey', //问�?�调查
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/survey.html'
                            }
                        }
                    })
                    .state('app.register', {
                        url: '/register',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/templates/registration.html',
                                controller: 'registerCtrl'
                            }
                        }
                    })
                    .state('app.login', {
                        url: '/login',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/login.html',
                                controller: 'loginCtrl'
                            }
                        }
                    })

                    .state('app.notification', {
                        url: '/notification',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/women.html',
                                controller: 'HomeCtrl'
                            }
                        }
                    })
                    .state('app.my_account', {
                        url: '/my_account',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/my_account.html',
                                controller: 'my_accountCtrl'
                            }
                        }
                    })

                    .state('app.forgotPwd', {
                        url: '/forgotPwd',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/templates/forgotpwd.html',
                                controller: 'forgotPwdCtrl'
                            }
                        }
                    })
                    .state('app.setting', {
                        url: '/setting',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/setting.html',
                                controller: 'settingCtrl'
                            }
                        }
                    })

                    .state('app.send_invitation', {
                        cache: false,
                        url: "/send_invitation",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/templates/send_invitation.html",
                                controller: "SendInviteCtrl"
                            }
                        }
                    })
                    .state('app.receive_invitation', {
                        cache: false,
                        url: "/receive_invitation",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/templates/receive_invitation.html",
                                controller: "ReceiveInvitationCtrl"
                            }
                        }
                    })
					.state('app.import_contact', {
                        cache: false,
                        url: "/import_contact",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/templates/import_contact.html",
                                controller: "ImportContactCtrl"
                            }
                        }
                    })
                    .state('app.send_message', {
                        url: "/send_message",
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: "templates/templates/send_message.html",
                                controller: "HomeCtrl"
                            }
                        }
                    })
                    .state('app.nearbycontacts', {
                        url: "/nearbycontacts",
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: "templates/templates/nearbycontacts.html",
                                controller: "NearByContactCrtl"
                            }
                        }
                    })
                    .state('app.change_password', {
                        url: "/change_password",
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: "templates/templates/change_password.html",
                                controller: "ChangePwdCtrl"
                            }
                        }
                    })
                    .state('app.messages', {
                        url: "/messages",
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: "templates/templates/messages.html",
                                controller: "messageCtrl"
                            }
                        }
                    })
                    .state('app.reply_message', {
                        url: "/reply_message?msg_id=",
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: "templates/templates/reply_message.html",
                                controller: "ReplyMessageCtrl"
                            }
                        }
                    })
                    .state('app.contact', {
                        url: "/contact",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/templates/contacts.html",
                                controller: "contactCtrl"
                            }
                        }
                    })
                    .state('app.frame', {
                        url: '/frame/:page',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/templates/frame.html',
                                controller: 'FrameCtrl'
                            }
                        }
                    });

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/home');


        })
        .filter('capitalize', function () {
            return function (input) {
                return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
            }
        })
        .factory('myService', function ($rootScope, $scope) {

            $scope.sessionData = {};
            $scope.sessionData.user_id = getStorage('user_id');
            $rootScope.service.post('getUser', $scope.sessionData, function (user) {
                $scope.user = typeof user.result === 'object' ? user.result : null;
                setStorage('username', user.result.u_username);
                $scope.invite = user.invite;
                $scope.notification = user.message;
            });

        })
        .directive('onFinishRender', function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {
                    if (scope.$last === true) {
                        $timeout(function () {
                            scope.$emit('ngRepeatFinished');
                        });
                    }
                }
            }

        });

window.onerror = function (e, file, line) {
    if (!Config.debug) {
        return;
    }
    alert([e, file, line].join(', '));
};


function setStorage(key, value) {
    localStorage.setItem(key, value);
}

function getStorage(key) {
    return localStorage.getItem(key);
}

function removeStorage(key) {
    localStorage.removeItem(key);
}

function explode(sep, string) {
    var res = string.split(sep);
    return res;
}

function urlencode(data) {
    return encodeURIComponent(data);
}

function alertDismissed() {
    // do something
}
