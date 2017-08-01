 <h1>申请信息</h1>
           <div class="title"><h4 style="display:inline-block">申请人类型　　</h4><span> {{formatsort(editemegs.sort.value)}}</span></div>
           <div class="title"><h4 style="display:inline-block">收银台　　　　</h4><span>民生银行收银台</span></div>
           <div class="title"><h4 style="display:inline-block">申请时间　　　</h4><span>{{format(editemegs.created.value)}}</span></div>
           <div class="title"><h4 style="display:inline-block">申请状态　　　</h4><span>{{formatstatus(editemegs.status.value)}}</span></div>
           <h1>店铺信息</h1>
           <div class="title"><h4>店铺名称　　　</h4><input type="text" name="" v-model="editemegs.shopName.value"></div>
           <div class="title" style="position: relative"><h4>店铺地址　　　</h4><div><span>{{editemegs.province.value}}　　</span><span>{{editemegs.city.value}}　　</span><span>{{editemegs.area.value}}　　</span><i class="el-icon-edit"></i></div><address-picker :opts="obj" v-model="shopaddres"style="display:inline-block;margin:10px 0 0 80px;" v-show="seleaddress"></address-picker>
           <br>
           <input type="text" name="" style="margin-left:100px;" placeholder="请输入详细地址" v-model="editemegs.address.value"></div>
           <div class="title"><h4>店铺电话　　　　</h4><el-row class="demo-autocomplete">
            <el-col :span="12">
              <el-autocomplete
                class="inline-input"
                v-model="state3"
                :fetch-suggestions="querySearch"
                placeholder="请输入店铺电话"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
            </el-col>
        </el-row></div>
        <div class="title"><h4>经营类型　　　　</h4>
         <el-select v-model="valuestyle" clearable placeholder="请选择" @change="rbackvalue">
          <el-option
            v-for="item in stylemeg"
            :label="item.type"
            :value="item.type"
            >
          </el-option>
        </el-select> <el-select v-model="valuestyles" clearable placeholder="请选择">
          <el-option v-if="stylemegs"
            v-for="item in stylemegs"
            :value="item.operateTypeId"
            :label="item.details"
            >
          </el-option>
        </el-select>
        </div>
        <h1>法人信息</h1>
           <div class="title"><h4>法人姓名　　　</h4><input type="text" v-model="editemegs.linkName.value"></div>
           <div class="title"><h4>省份证号　　　</h4><input type="text"  v-model="editemegs.cardNum.value"></div>
           <div class="title"><h4>手机号码　　　</h4><input type="text" v-model="editemegs.linkPhone.value"></div>
           <div class="title"><h4>开户人　　　　</h4><input type="text" v-model="editemegs.linkName.value"></div>
           <div class="title"><h4>开户行　　　　</h4><input type="text" v-model="editemegs.openBank.value"></div>
           <div class="title"><h4>卡号　　　　　</h4><input type="text" v-model="editemegs.bankCard.value"></div>
           <div class="btn"> 
           <button  @click="addsave" type="button" class="el-button el-button--default"><span>仅保存</span></button>

           </div>