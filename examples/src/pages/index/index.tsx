import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { Backdrop, Button, Loading, Popup } from '@zing-kit/core';
import { useState } from 'react';
import './index.less';

export default function Index() {
  const [open, setOpen] = useState(false);
  useLoad(() => {
    console.log('Page loaded.');
  });

  return (
    <View className="index">
      <Button>基础按钮</Button>
      <Button primary onClick={() => setOpen(true)}>
        主要按钮
      </Button>
      <Button primary loading onClick={() => setOpen(true)}>
        主要按钮
      </Button>
      <Loading />
      <Loading.Dot size={30} color='red' />
      <Backdrop
        duration={0.4}
        onClose={() => {
          console.log('close');
          setOpen(false);
        }}
      >
        <View>123</View>
      </Backdrop>
      <Popup open={open} closeable rounded position='bottom' onClose={() => setOpen(false)}>
        <View>123</View>
      </Popup>
      <Text>Hello world!</Text>
    </View>
  );
}
