import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";

import { Button } from "@zing-kit/core";
import "./index.scss";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className="index">
      <Button color='primary' block>你好</Button>
      <Text>Hello world!</Text>
    </View>
  );
}
