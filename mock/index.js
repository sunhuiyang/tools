export default [
  {
    url: "/account/login",
    method: "post",
    response: ({query}) => {
      return {
        code: 0,
        data: {
          id: "@id",
          username: "@cname",
          "password|10000-99999": 10000
        }
      };
    }
  }
];
