<template>
  <div class="account-login-contaienr">
    <div class="account-login-bd">
      <div class="company-info-container">
        <img class="company-info-logo" src="~@/assets/logo.png" />
        <span class="company-info-name">Vue Admin</span>
      </div>
      <div class="account-login-mainer">
        <el-form
          :model="passwordFrom"
          status-icon
          :rules="passwordRules"
          ref="passwordFrom"
        >
          <el-form-item prop="phone">
            <el-input
              type="number"
              prefix-icon="el-icon-mobile-phone"
              placeholder="请输手机号"
              v-model="passwordFrom.phone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              v-model="passwordFrom.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width: 100%"
              @click="submitForm('passwordFrom')"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import indexModel from './../models/index'
export default {
  data() {
    return {
      passwordFrom: {
        phone: "",
        password: ""
      },
      passwordRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        password: [
          {
            pattern: /^(?![^a-zA-Z]+$)(?!\D+$)/,
            message: '密码必须字母和数字组合',
            trigger: 'blur'
          },
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(() => {
        let phone = this.passwordFrom.phone
        let password = this.passwordFrom.password
        let params = {phone, password}
        if(!phone || !password){
          return
        }
        indexModel.login(params).then(res => {
          if(res.data.code === 200){
            localStorage.setItem('token',res.data.token)
            this.$message.success('登录成功!')
            this.$router.replace({name: 'Aritcle'})
          }else{
            this.$message.error('登陆失败!')
          }
        })
      })
    }
  }
};
</script>

<style lang="less" scoped>
.flex-cell {
  display: flex;
  .flex-cell-bd {
    flex: 1;
  }
  .flex-cell-ft {
    width: 130px;
    margin-left: 8px;
    &:after {
      display: none;
    }
    &.link {
      font-size: 14px;
      font-weight: 500;
      text-align: center;
      color: #409eff;
      text-decoration: none;
    }
  }
}
.account-login-contaienr {
  padding-top: 40px;
}
.account-login-bd {
  padding: 32px 0;
}
.company-info-container {
  display: flex;
  justify-content: center;
  .company-info-logo {
    height: 44px;
    margin-right: 20px;
  }
  .company-info-name {
    line-height: 44px;
    font-size: 33px;
    font-weight: 600;
    font-family: Avenir;
  }
}
.account-login-mainer {
  max-width: 388px;
  margin: 40px auto;
}
</style>
