var app = getApp();
function Tall(id, name){
    this.id = id;
    this.name = name;
}

Page({
    data: {
        dateDay: app.cache.getNonExport('loginUser').birthday|| '2018-01-05',
        selectorTall:[],
        selectorWeight: [],
        rangeTallKey: ['150'],
        arrTallIndex: 0,
        rangeWeightKey: ['150'],
        arrWeightIndex: 0,
        userInfo:app.cache.getNonExport('loginUser'),
    },

    createTallArr(start,end){

        let talls = [];
        for(var i = start; i <= end; i++ ){
            let entity = {
                id: i - start + 1,
                name: i
            }
            talls.push(entity);
        }

        this.setData({
            selectorTall: talls
        });
    },
    createWeightArr(start,end){
        let weights = [];
        for(var i = start; i <= end; i++ ){
            let entity = {
                id: i - start + 1,
                name: i
            }
            weights.push(entity);
        }

        this.setData({
            selectorWeight: weights
        });
    },
    selectorWeightChange(e) {
        this.setData({
            'arrWeightIndex': e.detail.value,
            'userInfo.weight': this.data.selectorWeight[e.detail.value].name
        });
    },
    selectorTallChange(e) {
        this.setData({
            'arrTallIndex': e.detail.value,
            'userInfo.height': this.data.selectorTall[e.detail.value].name
    });
    },

    dateChangeDay(e) {
        this.setData({
            'dateDay': e.detail.value,
            'userInfo.birthday': e.detail.value
        });
    },

    init(){
        this.createTallArr(150,250)
        this.createWeightArr(40,100)
    },

    onLoad: function (options) {
        console.log(app.cache.getNonExport('loginUser'));
        app.checkLoginStatus.checkSession()
        this.init();
    },

    changeKeywords(e){

        // console.log(e.detail.value)
        // console.log(e.currentTarget.dataset.index)
        let index = e.currentTarget.dataset.index
        let value = e.detail.value;
        let s =  'userInfo.aprisKeyWords['+index+']';
        console.log("before",this.data.userInfo)
        console.log("index=",index,"value=",value);
        this.setData({
            [s]: value
        })
        console.log("after",this.data.userInfo)
    },

    updateUserInfo(){
        swan.navigateTo({
            url: '../userInfo/userInfo'
        });
        console.log("修改用户信息",this.data.userInfo)

        let data = this.data.userInfo;

        data.aprisKeyWords = JSON.stringify(data.aprisKeyWords)

        console.log("修改用户信息",data)

        let url = app.globalData.URL + `:8100/user/update`;
        swan.request({
            url: url,
            method:'post',
            data:data,
            success:res=>{
                console.log(res)
                this.setData({
                    loginUser:res.data.data
                })
                if(res.data.data.aprisKeyWords !== null && res.data.data.aprisKeyWords !== '' ){
                    this.data.loginUser.aprisKeyWords = JSON.parse(res.data.data.aprisKeyWords)
                }
                app.cache.putNonExport("loginUser",this.data.loginUser);
            },
            fail:err=>{
                console.log(err)
            }
        })
    }
});