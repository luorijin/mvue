<template>
  <demo-section>
    <demo-block title="按钮类型">
      <mv-button type="default">默认按钮</mv-button>
      <mv-button type="primary">主要按钮</mv-button>
      <mv-button type="info">信息按钮</mv-button>
      <mv-button type="warning">警告按钮</mv-button>
      <mv-button type="danger">危险按钮</mv-button>
    </demo-block>
     <demo-block title="其它设置">
      <mv-button  plain type="primary">朴素按钮</mv-button>
      <mv-button round type="primary">圆角按钮</mv-button>
      <mv-button plain harline  type="primary">harline按钮</mv-button>
      <mv-button disabled type="primary">禁用按钮</mv-button>
    </demo-block>
  </demo-section>
</template>
<style lang="less" scoped>
    .mv-button{
      margin-bottom: 0.5rem;
    }
</style>
