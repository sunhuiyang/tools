<template>
  <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
    @finish="onFinish" @finishFailed="onFinishFailed" :rules="rules">
    <a-form-item has-feedback label="Username" name="username">
      <a-input v-model:value="formState.username" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="Password" name="password">
      <a-input-password v-model:value="formState.password" autocomplete="off" />
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 4, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
      <a-button type="primary" html-type="submit" v-type="type"></a-button>
      <a-button v-if="type === 'login'" type="primary" @click="toReg">go reg</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { getQueryString } from "../../utils/util";
import { useStore } from "../../store/pinia"
import { router } from "../../router";
export default defineComponent({
  props: {
    type: {
      type: String
    }
  },
  setup(props) {
    const router = useRouter();
    const formState = reactive({
      username: "",
      password: "",
      remember: true,
      nameRule: [{ required: true, message: "Please input your username!" }],
      passwordRule: [{ required: true, message: "Please input your password!" }]
    });
    formState.username = getQueryString("username");
    formState.password = getQueryString("password");
    const validateName = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("Please input the username");
      } else {
        // if (formState.password !== "") {
        //   formRef.value.validateFields("password");
        // }

        return Promise.resolve();
      }
    };

    const validatePass = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("Please input the password again");
      } else {
        return Promise.resolve();
      }
    };
    const rules = {
      username: [
        {
          required: true,
          validator: validateName,
          trigger: "blur"
        }
      ],
      password: [
        {
          validator: validatePass,
          trigger: "blur"
        }
      ]
    };
    const onFinishFailed = errorInfo => {
      console.log("Failed:", errorInfo);
    };
    const toReg = () => {
      console.log("to reg");
      router.push("/reg");
    };
    return {
      formState,
      onFinishFailed,
      toReg,
      rules
    };
  },
  methods: {
    onFinish(values) {
      const { username, password } = values;
      this.type === "reg"
        ? this.regist(username, password)
        : this.login(username, password);
    },
    login(username, password) {
      this.req("login", { username, password })
        .then(res => {
          console.log("login", res);
          const store = useStore();
          if (res.data.status) {
            store.setUserInfo(res.data);
            router.push("menu")
          }

        })
        .catch(err => {
          console.log("err", err);
        });
    },
    regist(username, password) {
      this.req("reg", { username, password })
        .then(res => { })
        .catch(err => {
          console.log("err", err);
        });
    },
    verify(username) {
      this.req("available", { username })
        .then(res => { })
        .catch(err => { });
    }
  }
});
</script>

<style scoped>
:deep(.ant-form-item-control-input-content) {
  display: flex;
  justify-content: space-evenly;
}

:deep(.ant-form-item-label) {
  text-align: center;
}

@media (max-width: 575px) {
  :deep(.ant-form-item-control) {
    max-width: 192px !important;
  }
}
</style>
