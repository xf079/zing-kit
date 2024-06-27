import { Image, View } from "@tarojs/components";
import { Button } from "@zing-kit/core";
import { Search } from "@zing-kit/icons";

definePageConfig({
  navigationBarTitleText: "Button",
});

export default function ButtonPage() {
  return (
    <View>
      <Search rotate={90} size={520} />
      <View className='icon' style={{ color: "red" }}></View>
      <View className='zing-block'>
        <View className='zing-block__title'>按钮颜色</View>
        <View className='zing-block__content'>
          <Button>默认按钮</Button>
          <Button primary>主要按钮</Button>
        </View>
      </View>
      <View className='zing-block'>
        <View className='zing-block__title'>文本按钮</View>
        <View className='zing-block__content'>
          <Button variant='text'>默认按钮</Button>
          <Button variant='text' primary>
            主要按钮
          </Button>
        </View>
      </View>
      <View className='zing-block'>
        <View className='zing-block__title'>轮毂按钮</View>
        <View className='zing-block__content'>
          <Button variant='outlined'>默认按钮</Button>
          <Button variant='outlined' primary>
            主要按钮
          </Button>
        </View>
      </View>
      <View className='zing-block'>
        <View className='zing-block__title'>禁止按钮</View>
        <View className='zing-block__content'>
          <Button disabled>默认按钮</Button>
          <Button primary disabled>
            主要按钮
          </Button>
          <Button variant='text' disabled>
            默认按钮
          </Button>
          <Button variant='text' primary disabled>
            主要按钮
          </Button>
          <Button variant='outlined' disabled>
            默认按钮
          </Button>
          <Button variant='outlined' primary disabled>
            主要按钮
          </Button>
        </View>
      </View>
      <View className='zing-block'>
        <View className='zing-block__title'>按钮形状</View>
        <View className='zing-block__content'>
          <Button shape='round'>默认按钮</Button>
          <Button primary shape='round'>
            主要按钮
          </Button>
          <Button variant='text' shape='round'>
            默认按钮
          </Button>
          <Button variant='text' primary shape='round'>
            主要按钮
          </Button>
          <Button variant='outlined' shape='round'>
            默认按钮
          </Button>
          <Button variant='outlined' primary shape='round'>
            主要按钮
          </Button>
        </View>
      </View>
      <View className='zing-block'>
        <View className='zing-block__title'>按钮尺寸</View>
        <View className='zing-block__content'>
          <Button size='large'>默认按钮</Button>
          <Button>默认按钮</Button>
          <Button size='small'>默认按钮</Button>
          <Button size='tiny'>默认按钮</Button>
          <Button size='large' primary>
            默认按钮
          </Button>
          <Button primary>默认按钮</Button>
          <Button size='small' primary>
            默认按钮
          </Button>
          <Button size='tiny' primary>
            默认按钮
          </Button>
        </View>
      </View>
      <View className='zing-block'>
        <View className='zing-block__title'>块级按钮</View>
        <View className='zing-block__content'>
          <Button block>默认按钮</Button>
          <Button block primary>
            默认按钮
          </Button>
        </View>
      </View>
    </View>
  );
}
