import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";

import { Button } from "@zing-kit/core";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className='index'>
      <Button>
        你好
      </Button>
      <Button variant='outlined'>
        你好
      </Button>
      <Button primary>
        你好
      </Button>
      <Button primary block>
        你好
      </Button>
      <Button primary block shape='round'>
        你好
      </Button>
      <Button primary>
        你好
      </Button>
    </View>
  );
}
