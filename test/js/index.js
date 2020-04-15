$(function () {
    console.log("====================================");

    window.onbeforeunload = function () {
        RESAFETY.callService({
            "service_id": "advanced_service.bat_service",
            "service_string": [
                { "service_id": "effect.destroy", "group_id": "gp00gp" },
                { "service_id": "effect.destroy", "group_id": "gp01gp" },
                { "service_id": "effect.destroy", "group_id": "gp02gp" },
                { "service_id": "effect.destroy", "group_id": "gp03gp" },
                { "service_id": "effect.destroy", "group_id": "gp04gp" },
                { "service_id": "effect.destroy", "group_id": "gp10gp" },
                { "service_id": "effect.destroy", "group_id": "gp11gp" },
                { "service_id": "effect.destroy", "group_id": "gp12gp" },
                { "service_id": "effect.destroy", "group_id": "gp13gp" },
                { "service_id": "effect.destroy", "group_id": "gp14gp" },
                { "service_id": "effect.destroy", "group_id": "gp16gp" },
                { "service_id": "effect.destroy", "group_id": "gp17gp" },
                { "service_id": "effect.destroy", "group_id": "gp18gp" },
                { "service_id": "effect.destroy", "group_id": "gp19gp" },
                { "service_id": "effect.destroy", "group_id": "gp20gp" },
                { "service_id": "effect.destroy", "group_id": "gp21gp" },
                { "service_id": "effect.destroy", "group_id": "gp22gp" },
                { "service_id": "effect.destroy", "group_id": "gp24gp" },
                { "service_id": "effect.destroy", "group_id": "发光路况" },
                { "service_id": "effect.destroy", "group_id": "gp30gp" },
                { "service_id": "effect.destroy", "group_id": "gp31gp" }
            ]
        });
    }

    $.ajax({
        url: 'json/reservoirBIM.json',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            /* 渲染数据 */
            let list1 = data.checklist1;
            list1.forEach(val => {
                $("#list1").append('<li><input type="checkbox" name="" class="checkboxall sel-checkboxall" thisType="' + val.type + '" thisIndex="' + val.index + '" thisTarget="' + val.target + '" thisUrl="' + val.url + '" thisImg="' + val.img + '" /><span>' + val.name + '</span></li>');
            })
            let list2 = data.checklist2;
            list2.forEach(val => {
                $("#list2").append('<li><input type="checkbox" name="" class="checkboxall sel-checkboxall" thisType="' + val.type + '" thisIndex="' + val.index + '" thisTarget="' + val.target + '" thisUrl="' + val.url + '" thisImg="' + val.img + '" /><span>' + val.name + '</span></li>');
            })
            let list3 = data.checklist3;
            list3.forEach(val => {
                $("#list3").append('<li><input type="checkbox" name="" class="checkboxall sel-checkboxall" thisType="' + val.type + '" thisIndex="' + val.index + '" thisTarget="' + val.target + '" thisUrl="' + val.url + '" thisImg="' + val.img + '" /><span>' + val.name + '</span></li>');
            })
            let list4 = data.checklist4;
            list4.forEach(val => {
                $("#list4").append('<li><input type="checkbox" name="" class="checkboxall sel-checkboxall" thisType="' + val.type + '" thisIndex="' + val.index + '" thisTarget="' + val.target + '" thisUrl="' + val.url + '" thisImg="' + val.img + '" /><span>' + val.name + '</span></li>');
            })
            /* 子项控制全选按钮 */
            $(".sel-checkboxall").click(function () {
                event.stopPropagation();
                /* 同级元素 */
                let bordernode = $(this).parent().siblings();
                let currcheck = $(this).is(':checked')
                let num = 0
                bordernode.each(index => {
                    let check = bordernode.eq(index).find(".sel-checkboxall").is(':checked');
                    if (currcheck != check) {
                        num++
                    }
                });
                if (num == 0) {
                    $(this).parents(".checkbox-list").find(".checkall").prop("checked", currcheck);
                } else {
                    $(this).parents(".checkbox-list").find(".checkall").prop("checked", !currcheck);
                }
                /* 有一个为false，全选为false */
                if (!currcheck) {
                    $(this).parents(".checkbox-list").find(".checkall").prop("checked", currcheck);
                }
            })
            /* 阻止事件冒泡 */
            $(".ul-list").on('click', 'li', event => {
                event.stopPropagation();
            })
        }
    })
    /* 弹出收起菜单 \防抖、频繁操作*/
    let timer = null;
    $(".checkbox-list").click(function () {
        if (timer == null) {
            timer = setTimeout(() => {
                let childnode = $(this).find(".check_icon").css("display");
                if (childnode == 'none') {
                    $(this).find(".selection-list").css({ display: "none", top: "0" })
                    $(this).find(".checkboxall").hide()
                    $(this).find(".check_icon").show()
                } else {
                    $(this).find(".checkboxall").show()
                    $(this).find(".check_icon").hide()
                    $(this).find(".selection-list").css({ display: "block" })
                    $(this).find(".selection-list").animate({ top: -80 * ($(this).find(".selection-list").find(".ul-list").find("li").length) + "rem" }, 300);
                }
                timer = null
            }, 300)

        }
    })
    /* 单选 */
    $('.footer').on('change', '.checkboxall', function () {
        let check = $(this).is(':checked')
        //获取请求相关参数
        let thisType = $(this).attr("thisType");
        let thisIndex = $(this).attr("thisIndex");
        let thisTarget = $(this).attr("thisTarget");
        let thisUrl = $(this).attr("thisUrl");
        let thisImg = $(this).attr("thisImg");
        if (thisUrl == undefined || thisUrl == "") {
            return;
        }
        if (check) {
            selectTheReques(thisType, thisIndex, thisTarget, thisUrl, thisImg);
        } else {
            selectTheClose(thisType, thisIndex);
        }
    });

    /* 全选 */
    $(".checkall").click(function () {
        event.stopPropagation();
        let check = $(this).is(':checked')
        let checkall = $(this).parents(".checkbox-list").find(".ul-list").find(".checkboxall");

        if (check) {
            checkall.each((index, item) => {
                checkall.eq(index).prop("checked", true);

                //获取请求相关参数
                let thisType = checkall[index].getAttribute("thisType");
                let thisIndex = checkall[index].getAttribute("thisIndex");
                let thisTarget = checkall[index].getAttribute("thisTarget");
                let thisUrl = checkall[index].getAttribute("thisUrl");
                let thisImg = checkall[index].getAttribute("thisImg");
                if (thisUrl == undefined || thisUrl == "") {
                    return;
                } else {
                    selectTheReques(thisType, thisIndex, thisTarget, thisUrl, thisImg);
                }
            })
        } else {
            checkall.each((index, item) => {
                checkall.eq(index).prop("checked", false)

                //获取请求相关参数
                let thisType = checkall[index].getAttribute("thisType");
                let thisIndex = checkall[index].getAttribute("thisIndex");
                let thisUrl = checkall[index].getAttribute("thisUrl");
                if (thisUrl == undefined || thisUrl == "") {
                    return;
                } else {
                    selectTheClose(thisType, thisIndex);
                }
            })
        }
    })
    
    /* jq版本太高，此方法已经被去除，如果低版本jq 弹出收起菜单功能用这个*/
    // $(".iconxiangxia").toggle(
    //     function() {
    //        
    //     },
    //     function() {
    //     }
    // );
})

// "type": "整体组",
// "index": "当前组当前数据索引值",
// "target": "返回字段数组长度",
// "url": "请求地址"
function selectTheReques(thisType, thisIndex, thisTarget, thisUrl, thisImg) {
    $.ajax({
        type: "post",
        url: "http://10.230.30.92:83/relay/api/sendGet",
        data: JSON.stringify({ "url": thisUrl }),
        contentType: "application/json",
        async: false,
        success: function (top) {
            let data = top.data.targetValue;
            let posData = [];
            let service = null;
            if (thisTarget === "1") {//[管理范围线],[保护范围线]返回数据数组长度为1
                let color = "lightline//红.png";
                let effect_id = "12580";
                if (thisIndex == 6) {
                    color = "lightline//绿.png";
                    effect_id = "12581";
                }
                for (var i in data[0]) {
                    data[0][i].z = 0;
                }
                service = {
                    "service_id": "effect.texture_line.create",
                    "pos": data[0],
                    "height_offset": 0,
                    "speed": 2,
                    "color": "0xffffffff",
                    "radius": 150,
                    "ral": 3000,
                    "is_flow": 1,
                    "texture_path": color,
                    "group_id": "发光路况",
                    "effect_id": effect_id
                };
                RESAFETY.callService(service);
            } else {
                if (thisTarget === "4") {//[无人机]
                    for (let i in data) {
                        posData.push({ "x": data[i][2], "y": data[i][3], "z": -9999 })
                    }
                } else if (thisTarget === "5") {//[普通视频站],[智能视频站],[出库口],[入库口]
                    for (let i in data) {
                        posData.push({ "x": data[i][3], "y": data[i][4], "z": -9999 })
                    }
                } else if (thisTarget === "6") {//[闸泵站],[水质站],[雨量站],[水位站],[标识牌],[管理哨所]
                    switch (thisType) {
                        case "1"://[闸泵站],[水质站],[雨量站],[水位站]
                            for (let i in data) {
                                posData.push({ "x": data[i][2], "y": data[i][3], "z": -9999 })
                            }
                            break;
                        case "2":
                            switch (thisIndex) {
                                case "0"://[标识牌]
                                    for (let i in data) {
                                        posData.push({ "x": data[i][4], "y": data[i][5], "z": -9999 })
                                    }
                                    break;
                                case "4"://[管理哨所]
                                    for (let i in data) {
                                        posData.push({ "x": data[i][3], "y": data[i][4], "z": -9999 })
                                    }
                                    break;
                            }
                            break;
                    }

                } else if (thisTarget === "7") {//[安全生产隐患]
                    for (let i in data) {
                        posData.push({ "x": data[i][5], "y": data[i][6], "z": -9999 })
                    }
                } else if (thisTarget === "8") {//[库区安全巡检],[库区安全报警]
                    for (let i in data) {
                        posData.push({ "x": data[i][6], "y": data[i][7], "z": -9999 })
                    }
                }
                for (var i in posData) {
                    service = {
                        "service_id": "effect.spatial_image.create",
                        "pos": posData[i],
                        "group_id": "3271",
                        "align_type": 5,
                        "texture_path": thisImg,
                        "width": 50,
                        "height": 50,
                        "group_id": "gp" + thisType + thisIndex + "gp"
                    };
                    console.log(JSON.stringify(service));
                    RESAFETY.callService(service);
                };
            }
        }
    });
}

function selectTheClose(thisType, thisIndex) {
    let service = null;
    if ((thisType === "2" && thisIndex === "5") || (thisType === "2" && thisIndex === "6")) {
        switch (thisIndex) {
            case "5":
                service = {
                    "service_id": "effect.destroy",
                    "effect_id": "12580"
                }
                break;
            case "6":
                service = {
                    "service_id": "effect.destroy",
                    "effect_id": "12581"
                }
                break;
        }
    } else {
        service = {
            "service_id": "effect.destroy",
            "group_id": "gp" + thisType + thisIndex + "gp"
        }
    }
    RESAFETY.callService(service);
}