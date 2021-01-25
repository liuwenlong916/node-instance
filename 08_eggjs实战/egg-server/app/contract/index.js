module.exports = {
  baseRequest: {
    id: {
      type: "string",
      description: "id 唯一值",
      required: true,
      example: "1",
    },
  },
  baseResponse: {
    code: { type: "integer", required: true, example: 1 },
    data: { type: "string", example: "请求成功" },
    errorMessage: { type: "string", example: "请求失败" },
  },
};
