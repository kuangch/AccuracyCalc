<template>

    <div class="c">
        <div class="reg">
            <convenience-image :src-nor="regImg" alignment='max-contain'></convenience-image>
        </div>
        <div class="para">
            <p>相机分辨率 W*H(选用W): {{W}}</p>
            <el-input-number size="small" v-model="W"/>
        </div>
        <div class="para">
            <p>亚像素精度k: {{k}}</p>
            <el-input-number size="small" v-model="k"/>
        </div>
        <div class="para">
            <p>基线L: {{useRangeL ? L.value[0] : singleLValue}}{{useRangeL ? 'mm-' : ''}}{{useRangeL ? L.value[1] : ''}}mm, 使用范围
                <el-switch
                        v-model="useRangeL">
                </el-switch>
            </p>

            <div v-show="useRangeL">
                <el-slider
                        size="small"
                        v-model="L.value"
                        show-stops
                        range
                        :step="20"
                        :min="L.min"
                        :max="L.max">
                </el-slider>
                基线L离散间隔: {{L.interval}} <br/>
                <el-input-number :step=25 :min=5 size="small" v-model="L.interval"/>
            </div >
            <el-input-number v-show="!useRangeL" :step=25 :min=5 size="small" v-model="singleLValue"/>
        </div>
        <div class="para">
            <p>距离d: {{d.value[0]}}mm-{{d.value[1]}}mm</p>
            <el-slider
                    size="small"
                    v-model="d.value"
                    show-stops
                    range
                    :step=500
                    :min="d.min"
                    :max="d.max">
            </el-slider>
            距离d离散间隔:  {{d.interval}} <br/>
            <el-input-number size="small" :step=500 :min=100 v-model="d.interval"/>
        </div>
        <div class="para">
            <p>视场角 W*H(度*度,选用W): </p>
            <el-select v-model="angleW" size="small">
                <el-option
                        v-for="(item,index) in $CONST.angle"
                        :key="index"
                        :label="item.label"
                        :value="item.w">
                </el-option>
            </el-select>
        </div>
        <div class="para">
            <el-button class="btn" @click="calc">计算</el-button>
        </div>

        <el-table
                v-if="tableData.length"
                :data="tableData"
                max-height="600"
                border>
            <el-table-column
                    fixed
                    prop="L"
                    label="L\d"
                    width="50">
            </el-table-column>

            <el-table-column
                    v-for="(item, index) in dCol"
                    :key="index"
                    :prop="item.prop"
                    :label="item.label"
                    :width="colWidth">
            </el-table-column>

        </el-table>

        <div class="para" v-if="tableData.length" >
            <el-button class="btn" @click="exportFile">导出</el-button>
        </div>


    </div>

</template>

<script>
    import excel from '../service/utils/excel';

    let reg = require('../assets/reg.jpg')
    export default {
        name: 'HelloWorld',
        beforeCreate() {
            this.$CONST = {
                angle: [
                    {
                        label: '83*53',
                        w: 83,
                        h: 53
                    },
                    {
                        label: '64*40',
                        w: 64,
                        h: 40
                    },
                    {
                        label: '44*26',
                        w: 44,
                        h: 26
                    }
                ],
                radian2angle: Math.PI / 180
            }
        },
        data() {
            let _this = this
            return {
                regImg: reg,
                W: 1920,
                k: 0.04,
                L: {
                    value: [55, 200],
                    min: 0,
                    max: 300,
                    interval: 25
                },
                d: {
                    value: [500, 4000],
                    min: 0,
                    max: 5000,
                    interval: 500,
                },
                angleW: _this.$CONST.angle[0].w,

                singleLValue: 55,
                useRangeL: true,
                colWidth: 96,
                dCol: [],
                tableData: []

            }
        },

        methods: {
            calc() {
                let _this = this

                _this.tableData = []
                _this.dCol = []

                let d = _this.d.value[0]
                while (d <= _this.d.value[1]){
                    _this.dCol.push({
                        prop: (d + '').replace('.','point'),
                        value: d,
                        label: d + ""
                    })
                    d += _this.d.interval
                }

                // _this.colWidth = Math.max(95, (document.getElementsByClassName('.table').clientWidth - 50) / _this.calc().length)

                let L = _this.useRangeL ? _this.L.value[0] : _this.singleLValue
                let LMax = _this.useRangeL ? _this.L.value[1] : _this.singleLValue
                while (L <= LMax){
                    let row = {
                        L: L
                    }

                    for(let c in _this.dCol){
                        c = _this.dCol[c]
                        row[c['prop']] = (2 * _this.k * Math.pow(c['value'], 2) * Math.tan(_this.angleW/2.0 * _this.$CONST.radian2angle ) / _this.W / L).toFixed(8)
                    }

                    _this.tableData.push(row)
                    L += _this.L.interval
                }
            },
            exportFile(){

                let _this = this
                let data = []

                for (let i in _this.tableData){
                    let row = []
                    let cols = _this.tableData[i]

                    let header = []
                    for( let colName in cols){

                        'L' === colName ? row.unshift(cols[colName]) : row.push(cols[colName])

                        if( 0 == i){
                            if ('L' === colName){
                                header.unshift("L\\d")
                                continue
                            }
                            for (let d in _this.dCol){
                                if (colName === _this.dCol[d]['prop']){
                                    header.push(_this.dCol[d]['value'])
                                }
                            }
                        }
                    }

                    if (0 == i){
                        data.unshift(header)
                    }
                    data.push(row)
                }

                excel.saveArray2local(data,function (result) {
                    if(!result){
                        _this.$message.error('导出失败')
                    }
                },'AccuracyCalcResult-' + new Date().toISOString() + '.xlsx')
            }
        }
    }
</script>

<style scoped lang="scss">
    @media screen and (max-width: 1920px) {
        .reg, .para {
            font-size: 20px;
        }
    }
    @media screen and (max-width: 1480px) {
        .reg, .para {
            font-size: 16px;
        }
    }
    @media screen and (max-width: 800px) {
        .reg, .para {
            font-size: 12px;
        }
    }

    .c {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .reg {
            width: 6rem;
            height: 4rem;
            margin-top: 0.5rem;
            margin-bottom: 1rem;
        }

        .para {
            width: 85%;
            min-width: 15rem;
            max-width: 25rem;

            .btn{
                margin-top: 1rem;
                margin-bottom: 1rem;
                width: 100%;
            }
        }
    }

    .el-table{
        font-size: 12px;
        width: 96%;
        max-width: 818px;
    }

</style>
