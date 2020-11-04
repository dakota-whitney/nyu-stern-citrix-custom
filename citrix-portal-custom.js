// Edit this file to add your customized JavaScript or load additional JavaScript files.

document.title = "Apps@Stern Portal";

/* Function to fetch local txt files to avoid browser caching*/
function setDynamicContent(txtFile, element) {
    CTXS.ExtensionAPI.proxyRequest({
       url: "customweb/"+txtFile,
       success: function(txt) {$(element).html(txt);}});
 }
 
 /*Function to set dynamic content to jquery targets*/
 var fetchedContent=false;
 function doFetchContent(callback)
 {
   if(!fetchedContent) {
     fetchedContent = true;
     setDynamicContent("serviceStatus.txt", ".customAuthHeader");
     setDynamicContent("workspaceLink.txt", ".customAuthBottom");
     setDynamicContent("accessibilityLink.txt", ".customAuthFooter");
   }
   callback();
 }


var doneClickThrough = false;

/*Show mandatory popup message before web login*/
CTXS.Extensions.beforeLogon = function (callback) {
    doneClickThrough = true;
    CTXS.ExtensionAPI.showMessage({
        messageTitle: "Welcome to Apps@Stern",
        messageText: "Please ensure you are on the latest version of Citrix Workspace (formerly Citrix Receiver) before logging in. You can find more details on the \"Citrix Workspace User Guide\" link below the Login form.",
        okButtonText: "Continue",
        okAction: callback
    });
};

/*Fetch and set txt files to jquery targets before user logon*/
CTXS.Extensions.beforeLogon = doFetchContent();

/*Fetch and set txt files to jquery targets before App selection screen
CTXS.Extensions.beforeDisplayHomeScreen = doFetchContent;*/

/*Show mandatory message before app selection screen*/
/*CTXS.Extensions.beforeDisplayHomeScreen = function (callback) {
    if (!doneClickThrough) {
        CTXS.ExtensionAPI.showMessage({
            messageTitle: "Welcome!",
            messageText: "Only for WWCo Employees",
            okButtonText: "Accept",
            okAction: callback
        });
    } else {
        callback();
    }
};*/

/*Web login links*/
$('.customAuthBottom').html("<a href='https://nyu.service-now.com/sp?id=kb_article_view&sysparm_article=041233514121935' target=\"_blank\">Citrix Workspace User Guide</a>");

$('.customAuthFooter').html("<a href='http://www.nyu.edu/accessibility' target=\"_blank\">Accessibility</a>");
