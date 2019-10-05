angular.module("app.controllers", []).controller("AppCtrl", function (o, s, t, e, a, n, i, r, u, c, l, d, g, p, m, f, v, h) {
    ionic.Platform.ready(function () {
        ionic.Platform.device()
    }), d.ready(function () {
        o.$apply(function () {
            var t = v.getDevice();
            console.log(navigator.contacts), console.log(t), o.manufacturer = t.manufacturer, o.model = t.model, o.platform = t.platform, o.uuid = t.uuid
        }), setStorage("c_e_s", 0), o.deldata = {}, o.deldata.d_id = o.uuid, s.service.post("dellivecontactslist", o.deldata, function (t) { }), o.findContactsBySearchTerm = function (t) { }, o.data_ne_s = {}, o.data_ne_s.keyword = 1, s.service.post("mobileappConfig", o.data_ne_s, function (t) {
            if (1 == t.result.config_value) {
                $("#pubiconbtn").show(), $("#import_contact").show(), setStorage("publish_confirm", 1);
                var n = 0;
                f.find({
                    filter: "",
                    multiple: !0,
                    fields: ["displayName", "name", "emails"],
                    desiredFields: ["displayName", "name", "emails"]
                }).then(function (t) {
                    $arr = [];
                    for (var e = 0; e < t.length; e++) "" != t[e].emails[0].value && ("" != t[e].name.formatted ? (n++, "undefined" == t[e].name.formatted ? $arr.push({
                        name: "NULL",
                        email: t[e].emails[0].value,
                        totl: n,
                        luserid: o.uuid
                    }) : $arr.push({
                        name: t[e].name.formatted,
                        email: t[e].emails[0].value,
                        totl: n,
                        luserid: o.uuid
                    })) : $arr.push({
                        name: "NULL",
                        email: t[e].emails[0].value,
                        totl: n,
                        luserid: o.uuid
                    }));
                    o.mobilecontactsarray = $arr, o.data = {};
                    var a = o.uuid;
                    o.data.u_id = a, s.service.post("insertmobileContactList", o.mobilecontactsarray, function (t) {
                        1 == t.status && (o.contacts = {}, o.data = {}, o.data.d_id = o.uuid, s.service.post("getmobileContactList", o.data, function (t) {
                            setStorage("c_ary", JSON.stringify(t.result))
                        }, function (t) {
                            navigator.notification.alert(t, alertDismissed, "HappenStance", "Okay")
                        }))
                    }, function (t) {
                        navigator.notification.alert(t, alertDismissed, "HappenStance", "Okay")
                    })
                })
            }
        })
    }), o.dynamic_menus = {}, o.appColor = p.AppColor, o.isIOS = ionic.Platform.isIPad() || ionic.Platform.isIOS(), o.$on("refreshParent", function () {
        u.reload()
    }), o.showLoading = function () {
        n.show({
            template: '<ion-spinner icon="spiral"></ion-spinner>'
        })
    }, o.hideLoading = function () {
        n.hide()
    }, o.showAlert = function (t, e) {
        i.alert({
            title: t,
            template: e,
            okType: "button-assertive"
        })
    }, o.menuClose = function () {
        c.toggleLeft(!1)
    }, o.height = window.screen.height - 160, o.showLogin = function () {
        o.user = {}, Config.getRememberme() && (o.user.rememberme = !0, o.user.username = Config.getUsername(), o.user.password = Config.getPassword());
        var t = i.show({
            templateUrl: "templates/login.html",
            title: "Login",
            cssClass: "login-container",
            scope: o,
            buttons: [{
                text: "cancel"
            }, {
                text: "login",
                type: "button-assertive",
                onTap: function (t) {
                    t.preventDefault(), o.loginData.username && o.loginData.password && (o.showLoading(), s.service.post("login", o.loginData, function (t) {
                        o.hideLoading(), t.code || t.message ? navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay") : (o.user = t, setStorage("user_id", t.id), Config.setRememberme(o.loginData.rememberme), o.loginData.rememberme ? (Config.setUsername(o.loginData.username), Config.setPassword(o.loginData.password)) : (Config.setUsername(""), Config.setPassword("")), o.hideLogin())
                    }))
                }
            }]
        });
        o.hideLogin = function () {
            t.close()
        }
    }, o.autoLogin = function () {
        o.loginData = {};
        var t = Config.getUsername();
        Config.getRememberme() && 0 < t.length && (o.loginData.username = Config.getUsername(), o.loginData.password = Config.getPassword(), o.showLoading(), console.log(o.loginData), s.service.post("login", o.loginData, function (t) {
            o.login_status = !0, o.hideLoading(), t.code || t.message || (setStorage("user_id", t.id), o.user = t)
        }))
    }, o.invite = "", o.getUser = function () {
        o.sessionData = {}, o.sessionData.user_id = getStorage("user_id"), o.$apply(function () {
            s.service.post("getUser", o.sessionData, function (t) {
                o.user = "object" == typeof t.result ? t.result : null, setStorage("username", t.result.u_username), o.invite = t.invite, o.notification = t.message
            })
        })
    }, o.getUser(), o.$on("$stateChangeSuccess", function (t, e, a, n, i) {
        s.service.post("getUser", o.sessionData, function (t) {
            o.user = "object" == typeof t.result ? t.result : null, setStorage("username", t.result.u_username), o.invite = t.invite, o.notification = t.message
        })
    }), o.user ? s.service.post("getInvitation", o.sessionData, function (t) {
        o.user = "object" == typeof t.result ? t.result : null
    }) : o.autoLogin(), o.doLogout = function () {
        o.showLoading(), removeStorage("user_id"), removeStorage("username"), Config.setUsername(""), Config.setPassword(""), r(o.hideLoading(), 1e3), u.go("app.login")
    }, o.showExit = function () {
        i.confirm({
            title: "Confirm",
            template: "",
            okType: "button-assertive",
            buttons: [{
                text: "Cancel"
            }, {
                text: "ok",
                onTap: function (t) {
                    t.preventDefault(), navigator.app.exitApp()
                }
            }]
        })
    }, d.registerBackButtonAction(function () {
        "app.home" === g.currentStateName() ? o.showExit() : navigator.app.backHistory()
    }, 100)
}).controller("HomeCtrl", function (e, a, t, n, i, o) {
    var s;
    0 != (s = getStorage("user_id")) && null != s && "undefined" != s ? (e.invitation = function () { }, e.sessionData = {}, e.sessionData.user_id = s, a.service.post("getUser", e.sessionData, function (t) {
        e.user = "object" == typeof t.result ? t.result : null, e.contact = t.contact, e.invite = t.invite, e.notification = t.message, 0 < e.invite && e.invitation()
    }), 1 == getStorage("publish_confirm") && ($("#pubiconbtn").show(), e.dat = {}, e.dat.u_id = s, e.publishLocation = function () {
        if (1 != getStorage("publish_confirm")) e.data = {
            hasWorkEntry: !0
        }, o.confirm({
            title: "Are you sure you want to share you location...!",
            content: '<p>Happenstance would like to access your location to tell you if any of your contacts are closeby.<br></p><ion-checkbox ng-model="data.hasWorkEntry" ng-checked="data.hasWorkEntry">Dont ask me again.</ion-checkbox>',
            scope: e
        }).then(function (t) {
            if (t) {
                n.getCurrentPosition({
                    timeout: 1e4,
                    enableHighAccuracy: !1
                }).then(function (t) {
                    e.dat.latitude = t.coords.latitude, e.dat.longitude = t.coords.longitude, e.showLoading(), a.service.post("updateLocation", e.dat, function (t) {
                        e.hideLoading(), 1 == t.status && navigator.notification.alert("Your location was published successfully.", alertDismissed, "HappenStance", "Okay")
                    })
                }, function (t) {
                    navigator.notification.alert("Please Turn on your GPS.", alertDismissed, "HappenStance", "Okay")
                }), e.data.hasWorkEntry && setStorage("publish_confirm", 1)
            }
        });
        else {
            n.getCurrentPosition({
                timeout: 1e4,
                enableHighAccuracy: !1
            }).then(function (t) {
                e.dat.latitude = t.coords.latitude, e.dat.longitude = t.coords.longitude, e.showLoading(), a.service.post("updateLocation", e.dat, function (t) {
                    e.hideLoading(), 1 == t.status && navigator.notification.alert("Your location was published successfully.", alertDismissed, "HappenStance", "Okay")
                })
            }, function (t) {
                navigator.notification.alert("Please Turn on your GPS.", alertDismissed, "HappenStance", "Okay")
            })
        }
    })) : t.go("app.login")
}).controller("loginCtrl", function (e, a, t, n, i, o) {
    var s;
    0 !== (s = getStorage("user_id")) && null !== s && o.goBack(), e.user = {}, e.submitForm = function (t) {
        t && (e.showLoading(), a.service.post("login", e.user, function (t) {
            if (e.hideLoading(), 1 == t.status) return navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay"), e.user = t, setStorage("user_id", t.result.u_id), Config.setUsername(e.user.username), Config.setPassword(e.user.password), e.getUser(), void i.go("app.home", {}, {
                reload: !0
            });
            navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay")
        }))
    }
}).controller("registerCtrl", function (e, a, t, n, i) {
    e.user = {}, e.showPrivacy = function () {
        t.show({
            templateUrl: "templates/privacy.html",
            title: e.translations.term_privacy,
            cssClass: "privacy-container",
            scope: e,
            buttons: [{
                text: e.translations.ok,
                type: "button-assertive"
            }]
        })
    }, e.submitForm = function (t) {
        t && (e.showLoading(), a.service.post("register", e.user, function (t) {
            e.hideLoading(), 1 == t.status ? (navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay"), i.go("app.login")) : navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay")
        }))
    }, e.doRegister = function () {
        e.validationCode === e.registerData.validation_Code ? (e.showLoading(), a.service.get("register", e.registerData, function (t) {
            if (e.hideLoading(), t[0]) return navigator.notification.alert("Register Successfully Done", alertDismissed, "HappenStance", "Okay"), e.getUser(), void i.go("app.home");
            navigator.notification.alert(t[2], alertDismissed, "HappenStance", "Okay")
        })) : navigator.notification.alert(e.translations.need_confirm_vali, alertDismissed, "HappenStance", "Okay")
    }
}).controller("forgotPwdCtrl", function (e, a, t, n) {
    e.user = {}, e.hideLogin, e.myBack = function () {
        n.go("app.home"), e.showLogin()
    }, e.submitForm = function (t) {
        t && (e.showLoading(), a.service.post("forgotPassword", e.user, function (t) {
            e.hideLoading(), 1 == t.status ? (navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay"), n.go("app.login")) : navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay")
        }))
    }
}).controller("ChangePwdCtrl", function (e, a, n, t) {
    e.user = {}, e.submitForm = function (t) {
        e.showLoading(), t && (e.user.u_id = getStorage("user_id"), a.service.post("changepassword", e.user, function (t) {
            e.hideLoading(), 1 == t.status ? (navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay"), n.go("app.home")) : navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay")
        }))
    }
}).controller("NearByContactCrtl", function (a, e, n, t, i, o) {
    a.data = {}, a.rows = 0;
    var s = getStorage("user_id");
    a.data.u_id = s, a.user = {}, a.userId = s, a.contacts = {}, a.showLoading(), e.service.post("getNearByContact", a.data, function (t) {
        a.hideLoading(), a.contacts = angular.fromJson(t.result), angular.forEach(a.contacts, function (t, e) {
            0 == t.inv_five && 0 == t.inv_ten && 0 == t.inv_fifteen || a.rows++
        })
    }), a.sendMessage = function () {
        a.data.sender_u_id = a.data.u_id, a.data.receivers = a.user, a.valid = 1;
        i.show({
            templateUrl: "templates/templates/send_message.html",
            title: "Send Message",
            scope: a,
            state: n,
            buttons: [{
                text: "Cancel"
            }, {
                text: "<b>Send</b>",
                type: "button-positive",
                onTap: function (t) {
                    a.data.message ? (a.showLoading(), o(a.hideLoading(), 3e3), e.service.post("sendMultiMessage", a.data, function (t) {
                        a.hideLoading(), 1 == t.status ? (navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay"), n.go(n.current, {}, {
                            reload: !0
                        })) : (a.valid = 0, navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay"))
                    }), 0 == a.valid && t.preventDefault()) : (t.preventDefault(), navigator.notification.alert("Please Eneter Message", alertDismissed, "HappenStance", "Okay"))
                }
            }]
        })
    }
}).controller("contactCtrl", function (a, n, i, t, o) {
    a.data = {};
    var e = getStorage("user_id");
    a.data.u_id = e, a.user = {}, a.userId = e, a.contacts = {}, n.service.post("getContacts", a.data, function (t) {
        a.contacts = angular.fromJson(t.result)
    }), a.deleteContact = function (e) {
        o.show({
            template: "<h4>Are You want to sure to delete this contact ?</h4>",
            title: "Delete Contact",
            cssClass: "normal",
            scope: a,
            buttons: [{
                text: "Cancel"
            }, {
                text: "<b>Yes</b>",
                type: "button-positive",
                onTap: function (t) {
                    a.showLoading(), a.user.inv_id = e, n.service.post("deleteContact", a.user, function (t) {
                        a.hideLoading(), 1 == t.status ? (navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay"), n.service.post("getContacts", a.data, function (t) {
                            a.contacts = angular.fromJson(t.result)
                        }), i.go(i.current, {}, {
                            reload: !0
                        })) : (a.valid = 0, navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay"))
                    })
                }
            }]
        })
    }, a.invitation = {}, a.editInvitation = function (t) {
        a.groups = [], a.user.u_id = getStorage("user_id"), n.service.post("groupList", a.user, function (t) {
            a.groups = angular.fromJson(t.result)
        }), n.service.post("getContactDetail", {
            inv_id: t,
            user_id: e
        }, function (t) {
            a.invitation = t.result, e == a.invitation.inv_u_id ? (a.invitation.inv_name = a.invitation.inv_r_name, a.invitation.inv_group = a.invitation.inv_r_group, a.invitation.opttype = 1) : (a.invitation.inv_name = a.invitation.inv_name, a.invitation.inv_group = a.invitation.inv_group, a.invitation.opttype = 2);
            o.show({
                templateUrl: "templates/templates/edit_contact_popup.html",
                title: "Edit Contact",
                scope: a,
                buttons: [{
                    text: "Cancel"
                }, {
                    text: "<b>Update</b>",
                    type: "button-positive",
                    onTap: function (t) {
                        a.showLoading(), 1 == a.invitation.inv_group && (a.invitation.inv_group = a.invitation.group), a.invitation.u_id = getStorage("user_id"), n.service.post("updateContact", a.invitation, function (t) {
                            a.hideLoading(), 1 == t.status ? (n.service.post("getContacts", a.data, function (t) {
                                a.contacts = angular.fromJson(t.result)
                            }), navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay"), i.go(i.current, {}, {
                                reload: !0
                            })) : (a.valid = 0, navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay"))
                        }), 0 == a.valid && t.preventDefault()
                    }
                }]
            })
        })
    }, a.sendMessage = function () {
        a.data.sender_u_id = a.data.u_id, a.data.receiver_u_id = a.user, a.valid = 1;
        o.show({
            templateUrl: "templates/templates/send_message.html",
            title: "Send Message",
            scope: a,
            state: i,
            buttons: [{
                text: "Cancel"
            }, {
                text: "<b>Send</b>",
                type: "button-positive",
                onTap: function (t) {
                    a.data.message ? (a.showLoading(), n.service.post("sendMessage", a.data, function (t) {
                        a.hideLoading(), 1 == t.status ? (navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay"), i.go(i.current, {}, {
                            reload: !0
                        })) : (a.valid = 0, navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay"))
                    }), 0 == a.valid && t.preventDefault()) : (t.preventDefault(), navigator.notification.alert("Please Eneter Message", alertDismissed, "HappenStance", "Okay"))
                }
            }]
        })
    }
}).controller("SendInviteCtrl", function (e, a, t, n) {
    e.groups = [], e.user = {}, e.user.u_id = getStorage("user_id"), a.service.post("groupList", e.user, function (t) {
        e.groups = t.result
    }), e.Onsubmit = !1, e.submitForm = function (t) {
        t ? (e.showLoading(), 1 == e.user.group_id && (e.user.group_id = e.user.group), e.user.userid = getStorage("user_id"), a.service.post("sendInvitation", e.user, function (t) {
            e.hideLoading(), 1 == t.status ? (navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay"), n.goBack()) : 2 == t.status ? n.goBack() : navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay")
        })) : e.Onsubmit = !0
    }
}).controller("ReceiveInvitationCtrl", function (a, n, i, o, t) {
    a.invite = {}, a.sessionData.u_id = getStorage("user_id"), n.service.post("receiveInvitation", a.sessionData, function (t) {
        a.invite = "object" == typeof t.result ? t.result : null
    });
    a.invite.u_name;
    var s = a.invite.u_fullname;
    a.acceptInvitation = function (t, e) {
        a.groups = {}, a.user.u_id = getStorage("user_id"), n.service.post("groupList", a.user, function (t) {
            a.groups = angular.fromJson(t.result)
        }), a.user = {}, a.user.name = s, a.user.inv_id = t, a.group = e, a.valid = 1;
        o.show({
            templateUrl: "templates/templates/receive_invitation_popup.html",
            title: "Accept Invitation",
            scope: a,
            buttons: [{
                text: "Cancel",
                type: "button-small"
            }, {
                text: "<b>Accept</b>",
                type: "button-positive button-small",
                onTap: function (t) {
                    a.user.code ? (a.user.group_id || (a.user.group_id = e), 1 == a.user.group_id && (a.user.group_id = a.user.group), a.showLoading(), a.user.u_id = getStorage("user_id"), n.service.post("acceptInvitation", a.user, function (t) {
                        a.hideLoading(), 1 == t.status ? (navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay"), i.go(i.current, {}, {
                            reload: !0
                        })) : (a.valid = 0, navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay"))
                    }), 0 == a.valid && t.preventDefault()) : (t.preventDefault(), navigator.notification.alert("Please Eneter code.", alertDismissed, "HappenStance", "Okay"))
                }
            }]
        })
    }, a.ignoreInvitation = function (t) {
        a.user.username = getStorage("username"), a.user.inv_id = t, a.valid = 1;
        o.show({
            template: "<h4>Are You want to sure to ignore this invitation ?</h4>",
            title: "Reject Invitation",
            cssClass: "normal",
            scope: a,
            buttons: [{
                text: "Cancel"
            }, {
                text: "<b>Yes</b>",
                type: "button-positive",
                onTap: function (t) {
                    a.showLoading(), a.user.u_id = getStorage("user_id"), n.service.post("ignoreInvitation", a.user, function (t) {
                        a.hideLoading(), 1 == t.status ? (navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay"), i.go(i.current, {}, {
                            reload: !0
                        })) : (a.valid = 0, navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay"))
                    })
                }
            }]
        })
    }
}).controller("messageCtrl", function (e, t, a, n) {
    var i = getStorage("user_id");
    e.messages = {}, e.showLoading(), setTimeout(function () {
        e.hideLoading()
    }, 5e3), e.sessionData.u_id = getStorage("user_id"), t.service.post("getMessageList", e.sessionData, function (t) {
        e.hideLoading(), e.messages = "object" == typeof t.result ? t.result : null
    }), e.getFavClassIcon = function (t, e, a) {
        return 1 == e && t == i ? "unread" : 0 < a ? "unread" : "read"
    }
}).controller("ImportContactCtrl", function (a, n, t, e, i, o) {
    a.searchfresult = null, a.data = {};
    var s = getStorage("user_id");
    a.data.u_id = s, a.data.d_id = a.uuid, a.contact_user = {}, a.userId = s, a.contacts = {}, a.allval = !0, n.service.post("getmobileContactList", a.data, function (t) {
        2 == t.status && 0 == getStorage("c_e_s") ? (navigator.notification.alert("Please wait while fetching contacts...", alertDismissed, "HappenStance", "Okay"), $waiting_ary = [], a.fetchcont = $waiting_ary) : (a.contacts = angular.fromJson(t.result), a.fetchcont = angular.fromJson(t.result))
    }), a.fetch_contact_by = function (t) {
        $(".alpha_div").css("background-color", ""), $("#" + t).css({
            "background-color": "#acd433",
            color: "#ffffff"
        })
    }, a.invitation = {}, a.editInvitation = function (t) {
        a.groups = [], a.user.u_id = getStorage("user_id"), n.service.post("groupList", a.user, function (t) {
            a.groups = angular.fromJson(t.result)
        }), n.service.post("getMobileContactDetail", {
            contact_id: t,
            user_id: s
        }, function (t) {
            a.invitation = t.result;
            o.show({
                templateUrl: "templates/templates/edit_mobile_contact_popup.html",
                title: "Edit Contact",
                scope: a,
                buttons: [{
                    text: "Cancel"
                }, {
                    text: "<b>Update</b>",
                    type: "button-positive",
                    onTap: function (t) {
                        a.showLoading(), 1 == a.invitation.inv_group && (a.invitation.inv_group = a.invitation.group), a.invitation.u_id = getStorage("user_id"), n.service.post("updateMobileContact", a.invitation, function (t) {
                            a.hideLoading(), 1 == t.status ? (a.data.d_id = a.uuid, n.service.post("getmobileContactList", a.data, function (t) {
                                a.contacts = angular.fromJson(t.result)
                            })) : a.valid = 0, navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay")
                        }), 0 == a.valid && t.preventDefault()
                    }
                }]
            })
        })
    }, a.sendMessage = function () {
        a.showLoading();
        var t = [];
        if ($(".importval:checked").each(function () {
                t.push(this.value)
        }), a.data.sender_u_id = a.data.contact_id, 0 == t.length) return a.hideLoading(), navigator.notification.alert("Please select contact.", alertDismissed, "HappenStance", "Okay"), !1;
        a.data.receiver_u_id = t, n.service.post("sendMobileContactInvitation", a.data, function (t) {
            a.hideLoading(), 1 == t.status ? (a.data.d_id = a.uuid, n.service.post("getmobileContactList", a.data, function (t) {
                a.contacts = angular.fromJson(t.result)
            }, function (t) {
                a.hideLoading(), navigator.notification.alert(t, alertDismissed, "HappenStance", "Okay")
            }), a.hideLoading(), navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay")) : 2 == t.status ? (a.data.d_id = a.uuid, n.service.post("getmobileContactList", a.data, function (t) {
                a.contacts = angular.fromJson(t.result)
            }, function (t) {
                a.hideLoading(), navigator.notification.alert(t)
            }), a.hideLoading()) : (a.hideLoading(), navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay"))
        }, function (t) {
            a.hideLoading(), navigator.notification.alert(t, alertDismissed, "HappenStance", "Okay")
        })
    }, a.filtercontacts = function (t, e) {
        null == t || "undefined" == t ? ($searchfilter = [], $searchfilter.push({
            msg: "Please type keyword"
        }), a.searchresult = $searchfilter) : (a.showLoading(), a.data_new = {}, a.data_new.keyword = t, a.data_new.opt = e, a.data_new.d_id = a.uuid, a.searchresult = null, a.searchfresult = null, n.service.post("searchmobileContactList", a.data_new, function (t) {
            a.hideLoading(), 0 < t.result_count ? (a.contacts = angular.fromJson(t.result), a.fetchcont = angular.fromJson(t.result)) : ($searchresult_array = [], $searchresult_array.push({
                msg: "No result found."
            }), a.searchfresult = $searchresult_array, a.contacts = angular.fromJson($searchresult_array), a.fetchcont = angular.fromJson($searchresult_array))
        }), a.allval = !0)
    }
}).controller("ReplyMessageCtrl", function (a, n, i, t, e, o) {
    a.messages = {}, a.data = {}, a.user_id = getStorage("user_id"), t.search().msg_id && (removeStorage("m_id"), setStorage("m_id", t.search().msg_id)), a.sessionData.m_id = getStorage("m_id"), n.service.post("getMessageDetail", a.sessionData, function (t) {
        a.messages = "object" == typeof t.result ? t.result : null
    }), a.replyMessage = function () {
        a.data.u_id = a.user_id, a.data.m_ref_id = t.search().msg_id, a.valid = 1;
        var e = o.show({
            templateUrl: "templates/templates/send_message.html",
            title: "Send Message",
            scope: a,
            buttons: [{
                text: "Cancel"
            }, {
                text: "<b>Send</b>",
                type: "button-positive",
                onTap: function (t) {
                    a.data.message ? (a.showLoading(), n.service.post("replyMessage", a.data, function (t) {
                        a.hideLoading(), 1 == t.status ? (navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay"), e.close(), i.go("app.reply_message", {
                            msg_id: a.data.m_ref_id
                        }, {
                            reload: !0
                        })) : (a.valid = 0, navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay"))
                    }), t.preventDefault()) : (t.preventDefault(), navigator.notification.alert("Please Eneter Message", alertDismissed, "HappenStance", "Okay"))
                }
            }]
        })
    }
}).controller("settingCtrl", function (t, e, a, n) { }).controller("AgentsCtrl", function (o, s, t, e) {
    s.agent && (o.titleText = s.agent.title, s.service.get("searchAgent", s.agent.params, function (t) {
        o.agentList = t
    }), o.showAgent = function () {
        o.agent = this.agent, t.show({
            templateUrl: "templates/agent.html",
            title: this.agent.store_name,
            cssClass: "agent-container",
            scope: o,
            buttons: [{
                text: o.translations.ok,
                type: "button-assertive"
            }]
        })
    }, o.showMap = function () {
        $("#map").length ? ($("#map").parent().html('<div id="map"></div>'), setTimeout(function () {
            var i = new BMap.Map("map"),
                t = new BMap.Point(s.agent.params.lng, s.agent.params.lat);
            0 < s.agent.params.radius && (o.zoomLevel = 13), 10 < s.agent.params.radius && (o.zoomLevel = 11), 20 < s.agent.params.radius && (o.zoomLevel = 9), 50 < s.agent.params.radius && (o.zoomLevel = 8), 200 < s.agent.params.radius && (o.zoomLevel = 6), 500 < s.agent.params.radius && (o.zoomLevel = 5), i.centerAndZoom(t, o.zoomLevel);
            t = new BMap.Point(s.agent.params.lng, s.agent.params.lat);
            var e = new BMap.Icon("img/position.png", new BMap.Size(32, 32)),
                a = new BMap.Label(s.agent.title, {
                    offset: new BMap.Size(20, -10)
                }),
                n = new BMap.Marker(t, {
                    icon: e
                });
            i.addOverlay(n), n.setLabel(a), o.agentList.forEach(function (t) {
                var e = new BMap.Point(t.lng, t.lat),
                    a = new BMap.Marker(e),
                    n = new BMap.Label(t.store_name, {
                        offset: new BMap.Size(20, -10)
                    });
                i.addOverlay(a), a.setLabel(n)
            })
        }, 100)) : setTimeout(o.showMap, 100)
    })
}).controller("notification", function (t, e, a) {
    t.trustSrc = function (t) {
        return e.trustAsResourceUrl(t)
    };
    var n = Config.frames[a.page];
    t.title = t.translations[a.page], t.src = Config.baseUrl + Config.getLocale() + n.src
}).controller("checkInvitationCtrl", function (e, a, t, n, i, o) {
    e.groups = {}, a.service.post("groupList", e.user, function (t) {
        e.groups = angular.fromJson(t.result)
    }), e.user = {}, e.user.username = getStorage("username"), e.submitForm = function (t) {
        t && (e.showLoading(), e.user.userid = getStorage("user_id"), a.service.post("acceptInvitation", e.user, function (t) {
            e.hideLoading(), t.status, navigator.notification.alert(t.message, alertDismissed, "HappenStance", "Okay")
        }))
    }
}).controller("FrameCtrl", function (t, e, a) {
    t.trustSrc = function (t) {
        return e.trustAsResourceUrl(t)
    };
    var n = Config.frames[a.page];
    t.title = t.translations[a.page], t.src = Config.baseUrl + Config.getLocale() + n.src
});