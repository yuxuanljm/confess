Page({
    data: {
        selectorWeight:[
            {
                id:"1",
                name:"偏胖"
            }, {
                id:"2",
                name:"适中"
            }, {
                id:"3",
                name:"偏瘦"
            }
        ],
        rangeWeightKey: ['偏瘦'],
        arrWeightIndex: 0
    },
    selectorWeightChange(e) {
        this.setData('arrWeightIndex', e.detail.value);
    },
});