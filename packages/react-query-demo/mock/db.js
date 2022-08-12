const Mock = require('mockjs');

module.exports = function () {
  const mock_data = {
    // key 的值 peoples，value 的值是长度为 10 的数组
    'peoples|10': [
      {
        id: '@increment',
        name: '@cname',
        age: '@integer(18,60)',
        city: '@city(true)',
        email: '@email',
      },
    ],
    // key 的值 list，value 的值是长度为 3 的数组
    'list|3': [
      {
        id: '@increment',
        name: '@cname',
      },
    ],
  };

  return Mock.mock(mock_data);
};
