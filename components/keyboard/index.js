Component({
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        innerText: {
            type: String,
            value: 'default value',
        }
    },
    data: {
        content: '',
        keyboardVal: ["¥30", "¥50", "¥100", 1, 2, 3, 4, 5, 6, 7, 8, 9, '·', 0, '<'],
        keyboardShow: true,
        // 是否选择推荐金额表示
        recommendFlag: true,
        // 当前余额
        balance: 5.32,
        //输入框是否为空
        isEmpty: true
    },
    methods: {
        switchBoard: function (e) {
            var keyboardShow = e.target.dataset.keyboardshow === 'true';
            this.setData({
                keyboardShow: keyboardShow
            })
        },
        inputMoney: function (e) {
            var { content, balance, recommendFlag, isEmpty } = this.data;
            var val = '' + e.target.dataset.money;
            // var content = this.data.content;
            var len = content.length;
            // var recommendFlag = this.data.recommendFlag;
            var index_point = content.indexOf('.');
            if (val.indexOf('¥') !== -1) {
                content = val;
                // balance += Number(content.replace('¥', '')); 
                recommendFlag = true;
            } else if (val === '<') {
                content = content.substr(0, len - 1);
            } else if (val === '·') {
                if (content.indexOf('.') === -1) {
                    content += '.';
                    len === 0 && (content = '0.');
                } else {
                    return;
                }
            } else {
                if (recommendFlag === true) {
                    content = val;
                    recommendFlag = false;
                } else {
                    //控制小数点后只有两位
                    if (index_point === -1 || (len - index_point) < 3) {
                        content += val
                        // balance += Number(content.replace('¥', '')); 
                    }
                };
            }
            content = content.replace(' ', '');
            isEmpty = !!!content;
            // balance += Number(content.replace('¥', '')); 

            this.setData({
                content: content,
                recommendFlag: recommendFlag,
                isEmpty: isEmpty
                // balance: balance
            })
        }
    }
})