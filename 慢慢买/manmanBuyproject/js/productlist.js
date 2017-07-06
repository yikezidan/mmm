$(function () {
    // console.log(GetQueryString("categoryid"))
    var categoryid = GetQueryString("categoryid");
    getNavStyle(categoryid)
    // console.log( GetQueryString("pageid"))
    // 获取nav数据
    var pageid = GetQueryString("pageid");
    // 获取商品列表数据
    getProductlist(categoryid,pageid)

})
// 获取地址栏当中的参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
// 获取nav
function getNavStyle(categoryid) {
    $.ajax({
        url:url+"api/getcategorybyid?categoryid="+categoryid,
        success:function(data){
            // console.log(data);
            // console.log(data.result)
            // console.log(data.result[0])
            // console.log(data.result[0].category)
            $(".productName").html(data.result[0].category)
        }
    })
}


function getProductlist(categoryid,pageid){
    var pageid = parseInt(pageid);
    $.ajax({
        url:url+"api/getproductlist",
        data:{
            "categoryid":categoryid,
            "pageid":pageid||1
        },
        success:function(data){
            // console.log(data)
            var html = template("productlistTpl",data);
            $("#productlist ul").html(html);
            // console.log(data.pagesize)
            var pagesize = data.pagesize;
            // console.log(data.totalCount)
            var totalCount = data.totalCount;
            var page = parseInt(Math.ceil(totalCount/pagesize));
            var option ="";
            for(var i= 0;i<page;i++){
                if((i+1)==pageid){
                     option+="<option selected value="+(i+1)+">第"+(i+1)+"页</option>"
                }else{
                     option+="<option value="+(i+1)+">第"+(i+1)+"页</option>"
                }
               
            }
            // console.log(option)
            $("#select").html(option)
            $("#select").on("change",function(){
                // console.log($(this).val())
                window.location.href ="./productlist.html?categoryid="+categoryid+"&pageid="+$(this).val();
            })
            var previousUrl = "./productlist.html?categoryid="+categoryid+"&pageid="+(pageid-1);
            var nextUrl = "./productlist.html?categoryid="+categoryid+"&pageid="+(pageid+1);
            $(".previous a").attr("href",previousUrl);
            $(".next a").attr("href",nextUrl)
            
        }
    })






}