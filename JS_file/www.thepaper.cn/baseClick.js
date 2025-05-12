function ad_clickMonitor(e) {
  var url = e.getAttribute("trueurl");
  if (url) {
    window.open(url);
    var attrurl = e.getAttribute("attrurl");
    attrurl && adReq(attrurl);
  }
}

function adReq(url) {
  try {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);
  } catch (e) {
    console.error("广告上报错误", e);
  }
}

(function () {
  var ua = navigator.userAgent;
  var isIE = ua.indexOf("compatible") > -1 && ua.indexOf("MSIE") > -1;
  var isIE11 = ua.indexOf("Trident") > -1 && ua.indexOf("rv:11.0") > -1;
  var browser = {
    versions: (function () {
      return {
        trident: ua.indexOf("Trident") > -1, //IE内核
      };
    })(),
  };
  if ((browser.versions.trident || isIE) && !isIE11) {
    window.location.href = "/version.html";
  }
})();

/*详情页投票处理*/
// var VotePanel = function (dom, votesArray) {
//   this.votesArray = votesArray || [];
//   this.dom = dom;
//   this.voteId = "0";
//   this.totalNum = "";
//   this.voteCountList = {}; //记录投票数
//   this.votePercentList = {}; //记录投票百分比
//   this.selectOptionId = -1; //判断可投票情况是否已经投票
//   this.saved = false; //客户端保存是否投票过，投票过不能继续投
// };
// VotePanel.prototype.resetVote = function () {
//   //初始或重置投票
//   var votePanel = this.dom;
//   if (votePanel == null) {
//     //页面没有投票
//     return;
//   }
//   this.voteId = votePanel.data("voteid");

//   for (var i = 0; i < this.votesArray.length; i++) {
//     var voteObj = this.votesArray[i];
//     var voteItems = voteObj.optionList;
//     if (this.voteId == voteObj.voteId) {
//       this.totalNum = voteObj.voteNum;
//       votePanel.find(".vote__count span").text(voteObj.voteNum);
//       for (var j = 0; j < voteItems.length; j++) {
//         var voteItem = voteItems[j];
//         var optionId = voteItem.optionId;
//         var voteCount = voteItem.voteCount;
//         this.voteCountList[optionId] = voteCount;
//       }
//       break;
//     }
//   }
// };
// VotePanel.prototype.getVoteStorage = function () {
//   //获取storage中投票数据
//   var wlstorage = window.localStorage;
//   var voteStorageStr = wlstorage.getItem("voteStorage") || "{}";
//   var voteStorage = JSON.parse(voteStorageStr);
//   return voteStorage;
// };
// VotePanel.prototype.checkIsSave = function () {
//   //判断当前投票是否保存，若存在则返回选项id
//   var voteStorage = this.getVoteStorage();
//   var optionId = voteStorage[this.voteId] || "-1";
//   return optionId;
// };
// VotePanel.prototype.saveVote = function (optionId) {
//   //投票保存storage中，key 投票id value 选项id
//   var voteStorage = this.getVoteStorage();
//   var voteId = this.voteId;
//   voteStorage[voteId] = optionId;
//   var voteStorageStr = JSON.stringify(voteStorage);
//   window.localStorage.setItem("voteStorage", voteStorageStr);
// };
// VotePanel.prototype.getMaxVoteOptionId = function () {
//   //获取投票数最多的选项Id
//   var maxVoteCount = -1;
//   var maxOptionId = -1;
//   for (var optionId in this.voteCountList) {
//     var voteCount = parseInt(this.voteCountList[optionId]);
//     if (maxVoteCount < voteCount) {
//       maxVoteCount = voteCount;
//       maxOptionId = optionId;
//     }
//   }
//   return maxOptionId;
// };

// VotePanel.prototype.voteAnimate = function () {
//   //百分比动画
//   var that = this;
//   var perActionIndex = 1;
//   var perActionTimer = setInterval(function () {
//     var tempObject = {};
//     for (var optionId in that.votePercentList) {
//       $voteItemPercent = that.dom
//         .find(".vote__item[data-optionId='" + optionId + "']")
//         .find(".vote__item__percent");
//       if (perActionIndex == 9) {
//         $voteItemPercent.html(that.votePercentList[optionId]);
//       } else {
//         var voteCount = parseInt(that.votePercentList[optionId]);
//         $voteItemPercent.html(
//           Math.round((voteCount / 10) * perActionIndex) + "%"
//         );
//       }
//     }
//     perActionIndex++;
//     if (perActionIndex == 10) {
//       clearInterval(perActionTimer);
//       perActionTimer = null;
//     }
//   }, 40); //400好秒运行10次变化 因此变化间隔时间为400/10
// };
// VotePanel.prototype.changePercent = function (maxOptionId) {
//   //最大值采用1-其他计算
//   var otherTotalPer = 0; //排除最大值其余比例和
//   for (var optionId in this.voteCountList) {
//     $voteItemBg = this.dom
//       .find(".vote__item[data-optionId='" + optionId + "']")
//       .find(".vote__item__bg");
//     var voteCount = parseInt(this.voteCountList[optionId]);
//     if (maxOptionId != optionId) {
//       if (this.totalNum == 0) {
//         var bl = 0;
//         this.votePercentList[optionId] = "0%";
//       } else {
//         var bl = Math.round((voteCount / this.totalNum) * 100);
//         if (voteCount != 0 && bl == 0) {
//           bl = 1;
//         }
//         this.votePercentList[optionId] = bl + "%";
//       }
//       otherTotalPer += bl;
//       $voteItemBg.css("width", this.votePercentList[optionId]);
//     }
//   }
//   this.votePercentList[maxOptionId] = 100 - otherTotalPer + "%";
//   this.dom
//     .find(".vote__item[data-optionId='" + maxOptionId + "']")
//     .find(".vote__item__bg")
//     .css("width", 100 - otherTotalPer + "%");
// };
// //addVote.msp?optionId=1
// VotePanel.prototype.sendAjax = function (optionId, success, error) {
//   fetch("/wap/addContentNoteVote.msp", {
//     type: "post",
//     data: "optionId=" + optionId + "&voteId=" + this.voteId,
//     timeout: 30000,
//     dataType: "json",
//     success: function (data) {
//       //{"resultMsg":"投票成功","resultCode":"1","voteCount":"1"}
//       if (data.resultCode == 1) {
//         if (success) success();
//       }
//     },
//     error: function (XMLHttpRequest, textStatus, errorThrown) {
//       if (error) error();
//     },
//   });
// };
// VotePanel.prototype.addVote = function (optionId, num) {
//   if (this.saved) {
//     return;
//   }
//   this.resetVote();
//   this.totalNum = parseInt(this.totalNum) + num;
//   this.dom.find(".vote__count span").html(this.totalNum);
//   this.dom.find(".vote__item").removeClass("vote__item--select");
//   this.dom
//     .find(".vote__item[data-optionId='" + optionId + "']")
//     .addClass("vote__item--select");
//   this.dom.find(".vote__itemlist").addClass("vote__itemlist--select");
//   var newVote = parseInt(this.voteCountList[optionId]) + num;
//   this.saved = true; //一但选择不能更改
//   var that = this;
//   if (num != 0) {
//     //为零设置初始状态不需要发请求
//     this.sendAjax(
//       optionId,
//       function () {
//         that.dealAdd(optionId, newVote);
//       },
//       function () {
//         that.saved = false;
//       }
//     );
//   } else {
//     that.dealAdd(optionId, newVote);
//   }
// };
// VotePanel.prototype.dealAdd = function (optionId, newVote) {
//   this.voteCountList[optionId] = newVote;
//   var maxOptionId = this.getMaxVoteOptionId();
//   this.changePercent(maxOptionId);
//   this.voteAnimate();
//   this.saveVote(optionId);
// };
// VotePanel.prototype.initEvent = function () {
//   var voteItem = this.dom.find(".vote__item");
//   var that = this;
//   for (var i = 0; i < voteItem.length; i++) {
//     (function (j) {
//       voteItem.eq(j).on("click", function () {
//         that.addVote(voteItem.eq(j).data("optionid"), 1);
//       });
//     })(i);
//   }
// };
